"use client";

import { Comment } from "@/types/post";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const createdAtLabel = (() => {
    const date = new Date(comment.createdAt);
    return Number.isNaN(date.getTime())
      ? comment.createdAt
      : date.toLocaleString("ko-KR");
  })();

  return (
    <article className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{comment.author}</span>
        <time
          dateTime={comment.createdAt}
          className="text-xs text-muted-foreground"
        >
          {createdAtLabel}
        </time>
      </div>

      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
        {comment.content}
      </p>
    </article>
  );
}
