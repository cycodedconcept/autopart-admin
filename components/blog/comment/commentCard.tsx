"use client";

import React from "react";
import { CommentItem } from "@/types/post";

interface CommentCardProps {
  comment: CommentItem;
  onApprove?: (id: string) => void;
  onUnapprove?: (id: string) => void;
  onReply?: (id: string) => void;
  onEditReply?: (id: string) => void;
  onMarkSpam?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onApprove,
  onUnapprove,
  onReply,
  onEditReply,
  onMarkSpam,
  onDelete,
}) => {
  const isPending = comment.status === "PENDING";
  const isApproved = comment.status === "APPROVED";
  const isSpam = comment.status === "SPAM";

  return (
    <div className="w-full flex flex-col gap-3 font-sans border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
      {/* 1. Header Information Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Avatar Ring Symbol */}
          <div className={`w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold shrink-0 ${
            comment.author.isAuthor 
              ? "bg-orange-100 text-aorange" 
              : "bg-gray-100 text-gray-600"
          }`}>
            {comment.author.avatarInitials}
          </div>

          {/* Identity Mappings */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-gray-900">{comment.author.name}</span>
            <span className="text-[11px] text-gray-400 font-medium">{comment.author.email}</span>
            
            {/* Context Badge Mappers */}
            {comment.author.isAuthor && (
              <span className="bg-aorange text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                Author
              </span>
            )}
            
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
              isPending ? "bg-orange-50 text-orange-500 border border-orange-100" :
              isApproved ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
              "bg-red-50 text-red-500 border border-red-100"
            }`}>
              {comment.status}
            </span>
          </div>
        </div>

        {/* Time Stamp Metrics */}
        <span className="text-[11px] text-gray-400 whitespace-nowrap">{comment.timeAgo}</span>
      </div>

      {/* 2. Target Context Post Attachment Label */}
      <div className="text-[11px] text-gray-400 font-medium pl-9">
        on <span className="text-aorange hover:underline cursor-pointer font-semibold">{comment.postTitle}</span>
      </div>

      {/* 3. Core Text Markdown content section wrapper */}
      <div className="text-xs text-gray-700 leading-relaxed pl-9 font-normal max-w-4xl">
        {comment.content}
      </div>

      {/* 4. Dynamic Administrative Functional Callbacks Action Row */}
      <div className="flex items-center gap-2 pl-9 text-[11px] font-semibold">
        {isPending && onApprove && (
          <button
            type="button"
            onClick={() => onApprove(comment.id)}
            className="px-2.5 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-800 shadow-2xs transition-colors cursor-pointer"
          >
            Approve
          </button>
        )}

        {isApproved && onUnapprove && (
          <button
            type="button"
            onClick={() => onUnapprove(comment.id)}
            className="px-2.5 py-1 text-gray-600 border border-gray-200 bg-white rounded hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            Unapprove
          </button>
        )}

        {onReply && !comment.author.isAuthor && (
          <button
            type="button"
            onClick={() => onReply(comment.id)}
            className="px-2.5 py-1 text-gray-600 border border-gray-200 bg-white rounded hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            Reply
          </button>
        )}

        {comment.author.isAuthor && onEditReply && (
          <button
            type="button"
            onClick={() => onEditReply(comment.id)}
            className="px-2.5 py-1 text-gray-600 border border-gray-200 bg-white rounded hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            Edit reply
          </button>
        )}

        {!isSpam && onMarkSpam && (
          <button
            type="button"
            onClick={() => onMarkSpam(comment.id)}
            className="px-2.5 py-1 text-gray-500 border border-gray-200 bg-white rounded hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            Mark spam
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(comment.id)}
            className="px-2.5 py-1 text-red-500 border border-red-100 bg-red-50/50 rounded hover:bg-red-50 transition-colors shadow-2xs cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>

      {/* 5. Hierarchical Nested Author Response Box Stream */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 pl-9 space-y-4 border-l border-gray-100">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              onApprove={onApprove}
              onUnapprove={onUnapprove}
              onReply={onReply}
              onEditReply={onEditReply}
              onMarkSpam={onMarkSpam}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
