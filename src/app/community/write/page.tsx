"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts, savePosts } from "@/lib/mockData";
import { Post } from "@/types/post";


export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      author: "익명",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    const posts = getPosts();
    const updatedPosts = [newPost, ...posts];

    savePosts(updatedPosts);
    router.push("/community");
  };

  return (
    <div>
      <h1>글 작성</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
}
