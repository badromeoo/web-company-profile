import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Hardcode projectId dan dataset untuk keamanan di server routes
const projectId = "mn07oouk"; // Hardcoded untuk mencegah error
const dataset = "production"; // Hardcoded untuk mencegah error
const token = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;

// Buat client langsung di file ini daripada import dari tempat lain
const serverClient = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2023-05-03", // Gunakan versi API terbaru
});

export async function POST(request: Request) {
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