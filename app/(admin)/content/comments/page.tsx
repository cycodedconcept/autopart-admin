"use client"

import { CommentCard } from "@/components/blog/comment/commentCard";
import { CommentItem } from "@/types/post";

const sampleCommentsList: CommentItem[] = [
  {
    id: "comment_01",
    author: { name: "Chidi Umeh", email: "chidiumeh@gmail.com", avatarInitials: "CU" },
    status: "PENDING",
    timeAgo: "3 days ago",
    postTitle: "The Most Common Fake Parts Circulating in Lagos Auto Markets",
    content: "This is accurate. I bought brake pads at Ladipo that failed within two months — the box even had the hologram. Please add a section on how to check the batch code against the manufacturer's site.",
    replies: [
      {
        id: "reply_01",
        author: { name: "Adebayo Okafor", email: "adebayo@autoparts.ng", avatarInitials: "AO", isAuthor: true },
        status: "APPROVED",
        timeAgo: "3 days ago",
        postTitle: "The Most Common Fake Parts Circulating in Lagos Auto Markets",
        content: "Fair point — we are adding a highway-use section in the next revision. Thank you.",
      }
    ]
  }
];

export default function AdministrativeCommentsDashboard() {
  const onApprove = (id: number) => {
     console.log("Approved item index tracking handle:", id)
  }
  const onDelete = (id:number) => {
    console.log("Removed comment index tracking path:", id)
  }
  return (
    <div className=" mx-auto bg-white border border-gray-100 rounded-lg shadow-xs space-y-6 p-4">
      {sampleCommentsList.map((item) => (
        <CommentCard 
          key={item.id} 
          comment={item}
          onApprove={() =>onApprove(1)}
          onDelete={() => onDelete(1)}
        />
      ))}
    </div>
  );
}
