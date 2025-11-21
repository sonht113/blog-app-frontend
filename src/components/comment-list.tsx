"use client";

import { useState } from "react";

import PaginationCustom from "./pagination-custom";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  date: Date;
}

interface CommentListProps {
  comments: Comment[];
  commentsPerPage?: number;
}

// Format date relative to now (e.g., "2 hours ago")
function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export default function CommentList({
  comments,
  commentsPerPage = 5,
}: CommentListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const paginatedComments = comments.slice(startIndex, endIndex);

  const renderComments = (commentList: Comment[]) => (
    <div className="space-y-4">
      {commentList.map((comment) => (
        <div
          key={comment.id}
          className="border border-gray-200 rounded-lg p-4 bg-white"
        >
          <div className="flex items-start gap-3">
            {/* Avatar placeholder */}
            <div className="shrink-0">
              <Avatar>
                <AvatarFallback>{comment.author.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>

            {/* Comment content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{comment.author}</h3>
                <span className="text-sm text-gray-400">
                  {formatTimeAgo(new Date(comment.date))}
                </span>
              </div>
              <p className="text-gray-700 mt-2 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{comments.length} Comments</h2>
      {renderComments(paginatedComments)}

      {/* Pagination */}
      {comments.length > commentsPerPage && (
        <div className="mt-8">
          <PaginationCustom
            data={comments}
            itemsPerPage={commentsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
