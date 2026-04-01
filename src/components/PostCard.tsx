"use client";

import { Post } from "@/types/post";
import { useRouter } from "next/navigation";


interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
  const router = useRouter();

  const createdAtLabel = (() => {
    // createdAt은 ISO 문자열로 제공됩니다.
    // localStorage 데이터가 깨져있는 경우를 대비해 안전하게 처리합니다.
    const date = new Date(post.createdAt);
    return Number.isNaN(date.getTime())
      ? post.createdAt
      : date.toLocaleDateString("ko-KR");
  })();

  const commentCount = post.comments?.length ?? 0;

  const handleClick = () => {
    router.push(`/community/${post.id}`);
  };

  return (
    <article className="w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
      <button
        type="button"
        onClick={handleClick}
        className="block w-full text-left"
        aria-label={`${post.title} 상세로 이동`}
      >
        <h2 className="text-base font-semibold leading-snug">{post.title}</h2>
      </button>

      <div className="mt-2 text-sm text-muted-foreground">
        <div>작성자: {post.author}</div>
        <div>작성일: {createdAtLabel}</div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLike?.(post.id);
          }}
          className="rounded-lg px-2 py-1 transition-colors hover:bg-background/60"
          aria-label={`좋아요 (${post.likes})`}
        >
          좋아요 {post.likes}
        </button>
        <span>댓글 {commentCount}</span>
      </div>
    </article>
  );
}
