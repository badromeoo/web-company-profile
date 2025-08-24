"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";

export default function CreateBlogPage() {
  const { currentUser, isLoading } = useUserStore();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isLoading, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !currentUser) {
      setError("Title, Body cannot be empty, and you must be logged in.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const userId = currentUser.objectId;
      const userName = currentUser.name || "Anonymous";

      let author = await client.fetch(`*[_type == "author" && userId == $userId][0]`, { userId });

      if (!author) {
        author = await client.create({
          _type: "author",
          name: userName,
          userId: userId,
          slug: { _type: "slug", current: `${userName.toLowerCase().replace(/\s+/g, "-")}-${nanoid(3)}` },
        });
      }

      let imageAssetRef = null;
      if (imageFile) {
        const imageAsset = await client.assets.upload("image", imageFile);
        imageAssetRef = { _type: "image", asset: { _type: "reference", _ref: imageAsset._id } };
      }

      const postBody = body.split("\n").map((paragraph) => ({
        _type: "block",
        style: "normal",
        _key: nanoid(),
        children: [{ _type: "span", _key: nanoid(), text: paragraph, marks: [] }],
      }));

      const newPost = {
        _type: "post",
        title: title,
        slug: { _type: "slug", current: `${title.toLowerCase().replace(/\s+/g, "-")}-${nanoid(5)}` },
        author: { _type: "reference", _ref: author._id },
        mainImage: imageAssetRef,
        publishedAt: new Date().toISOString(),
        caption: caption,
        body: postBody,
      };

      await client.create(newPost);
      router.push("/blog");
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Failed to create the post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!currentUser) return null;


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">
            Post Title
          </label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-white" required />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-300 text-sm font-bold mb-2">
            Main Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>
        {imagePreview && (
          <div className="mb-6 relative w-full h-64">
            <Image src={imagePreview} alt="Image Preview" fill style={{ objectFit: "contain" }} />
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="caption" className="block text-gray-300 text-sm font-bold mb-2">
            Caption
          </label>
          <input id="caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-white" />
        </div>
        <div className="mb-6">
          <label htmlFor="body" className="block text-gray-300 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            id="body"
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-white leading-relaxed focus:outline-none focus:shadow-outline"
            placeholder="Write your blog content here..."
            required
          />
        </div>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">or</p>
          <Link href="/studio/structure/post" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">
            Create with Rich Text Editor in Studio
          </Link>
        </div>
      </form>
    </div>
  );
}
