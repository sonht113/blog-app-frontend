"use client";

import { useState } from "react";

import Button from "./ui/button-custom";

interface CommentFormProps {
  isSignedIn: boolean;
  onSubmit?: (comment: string) => void;
}

export default function CommentForm({
  isSignedIn,
  onSubmit,
}: CommentFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit?.(comment);
      setComment("");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-700 text-center">
          Please <span className="font-semibold">sign in</span> to leave a comment
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Add a Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this blog post..."
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="default"
          colorScheme="primary"
          disabled={!comment.trim()}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
}
