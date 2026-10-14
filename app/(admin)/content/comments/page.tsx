"use client"

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { CommentCard } from "@/components/blog/comment/commentCard";
import { Pagination } from "@/components/atoms/pagination";
import { useApproveCommentQueryMutation, useBlogCommentsQuery } from "@/lib/queries";
import { BlogComment } from "@/types/blog";
import { CommentItem } from "@/types/post";

const PAGE_LIMIT = 10;

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Spam", value: "spam" },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const getTimeAgo = (iso: string) => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (Number.isNaN(seconds)) return "";
  const units: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [unitSeconds, unit] of units) {
    const value = Math.floor(seconds / unitSeconds);
    if (value >= 1) return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

const toCommentItem = (comment: BlogComment): CommentItem => {
  const name = comment.authorName ?? comment.name ?? "Anonymous";
  const status = (comment.status ?? "pending").toUpperCase();
  return {
    id: comment.id.toString(),
    author: {
      name,
      email: comment.authorEmail ?? comment.email ?? "",
      avatarInitials: getInitials(name),
      isAuthor: comment.isAuthor,
    },
    status: (["PENDING", "APPROVED", "SPAM"].includes(status) ? status : "SPAM") as CommentItem["status"],
    timeAgo: getTimeAgo(comment.createdAt),
    postTitle: comment.post?.title ?? comment.postTitle ?? "",
    content: comment.body,
    replies: comment.replies?.map(toCommentItem),
  };
};

export default function AdministrativeCommentsDashboard() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, error } = useBlogCommentsQuery(page, PAGE_LIMIT, status);

  const comments = data?.data?.comments?.map(toCommentItem) ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 0;

  const approveMutation = useApproveCommentQueryMutation();

  const onApprove = (id: string) => {
    approveMutation.mutate({ data: { id, status: "approved" } });
  }
  const onDelete = (id: string) => {
    console.log("Removed comment index tracking path:", id)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className=" mx-auto bg-white border border-gray-100 rounded-lg shadow-xs space-y-6 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => handleStatusChange(tab.value)}
            className={`px-3 py-1 text-xs font-semibold rounded border transition-colors cursor-pointer ${
              status === tab.value
                ? "bg-aorange text-white border-aorange"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-red-500">
          <AlertCircle className="w-4 h-4" />
          {error?.message || "Unable to load comments"}
        </div>
      ) : comments.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">No comments found.</p>
      ) : (
        comments.map((item) => (
          <CommentCard
            key={item.id}
            comment={item}
            onApprove={onApprove}
            onDelete={onDelete}
          />
        ))
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
