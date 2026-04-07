"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getPosts, savePosts } from "@/lib/mockData";
import { Comment, Post } from "@/types/post";
import CommentItem from "@/components/CommentItem";
// TODO: 필요한 import를 추가하세요
// - useState, useEffect (react)
// - useParams (next/navigation)
// - getPosts, savePosts (lib/mockData)
// - Post 타입 (types/post)
// - CommentItem 컴포넌트 (components/CommentItem)

export default function PostDetailPage() {
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [commentContent, setCommentContent] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  const post = useMemo((): Post | null => {
    if (!postId) return null;
    // refreshTick은 로컬스토리지 변경 이후 useMemo를 다시 돌리기 위한 트리거입니다.
    void refreshTick;
    try {
      const posts = getPosts();
      return posts.find((p) => p.id === postId) ?? null;
    } catch {
      return null;
    }
  }, [postId, refreshTick]);

  const createdAtLabel = (() => {
    if (!post) return "";
    const date = new Date(post.createdAt);
    return Number.isNaN(date.getTime())
      ? post.createdAt
      : date.toLocaleString("ko-KR");
  })();

  const handleLike = () => {
    if (!post) return;

    const updatedPost: Post = {
      ...post,
      likes: post.likes + 1,
    };

    const posts = getPosts();
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? updatedPost : p,
    );
    savePosts(updatedPosts);
    setRefreshTick((t) => t + 1);
  };

  const handleComment = () => {
    if (!post) return;

    const content = commentContent.trim();
    if (!content) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: "익명",
      createdAt: new Date().toISOString(),
    };

    const updatedPost: Post = {
      ...post,
      comments: [...(post.comments ?? []), newComment],
    };

    const posts = getPosts();
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? updatedPost : p,
    );
    savePosts(updatedPosts);
    setRefreshTick((t) => t + 1);
    setCommentContent("");
  };

  return (
    <div>
      <h1>게시글 상세</h1>
      {!post ? (
        <p>게시글을 찾을 수 없습니다.</p>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>

          <div>
            <div>작성자: {post.author}</div>
            <div>작성일: {createdAtLabel}</div>
          </div>

          <button type="button" onClick={handleLike}>
            좋아요 {post.likes}
          </button>

          <section>
            <h3>댓글</h3>
            <div>
              {post.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요"
              />
              <button type="button" onClick={handleComment}>
                댓글 작성
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
