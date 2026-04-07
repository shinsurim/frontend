import { NextRequest, NextResponse } from "next/server";
import { initialPosts } from "@/lib/mockData";
import { Post } from "@/types/post";

let posts: Post[] = [...initialPosts];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newPost: Post = {
      id: Date.now().toString(),
      title: body.title,
      content: body.content,
      author: body.author ?? "익명",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    posts = [newPost, ...posts];

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "게시글을 생성하지 못했습니다." },
      { status: 400 }
    );
  }
}

