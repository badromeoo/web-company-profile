import { serverClient } from "@/lib/sanity.server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TAMBAHKAN BARIS INI UNTUK DEBUGGING
  console.log("Server received token:", process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN);

  try {
    const postData = await request.json();
    const createdPost = await serverClient.create(postData);

    return NextResponse.json({
      message: "Post created successfully",
      post: createdPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Failed to create post", error }, { status: 500 });
  }
}
