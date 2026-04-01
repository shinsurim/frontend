"use client";

import PostCard from "@/components/PostCard";
import { getPosts, savePosts } from "@/lib/mockData";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 페이지 진입 시 getPosts()로 게시글 목록을 불러옵니다.
    try {
      setPosts(getPosts());
    } catch {
      setPosts([]);
    }
  }, []);

  const handleLike = (postId: string) => {
    setPosts((prev) => {
      const updated = prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      );
      savePosts(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">커뮤니티</h1>

        <button
          type="button"
          onClick={() => router.push("/community/write")}
          className="rounded-xl border border-border bg-card px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          글 작성
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
