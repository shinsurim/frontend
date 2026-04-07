"use client";

import BoardPage from "@/components/BoardPage";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch("/api/posts");

        if (!res.ok) {
          throw new Error("게시글을 불러오지 못했습니다.");
        }

        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("게시글을 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return <BoardPage posts={posts} loading={loading} error={error} />;
}
