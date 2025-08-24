"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { client } from "@/lib/sanity.client";

interface PostActionsProps {
  postId: string;
}

export default function PostActions({ postId }: PostActionsProps) {
  const { currentUser } = useUserStore();
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await client.delete(postId);

      alert("Post deleted successfully!");
      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Error deleting post.");
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="mt-12 text-center">
      <Link href={`/studio/desk/post;${postId}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-4" target="_blank" rel="noopener noreferrer">
        Edit in Studio
      </Link>
      <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Post
      </button>
    </div>
  );
}
