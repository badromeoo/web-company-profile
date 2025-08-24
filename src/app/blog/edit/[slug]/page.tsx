"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { Image as SanityImage, PortableTextBlock } from "sanity";
import { nanoid } from "nanoid";

// Tipe spesifik untuk children dari block
type Span = { _type: "span"; text: string };
type Block = PortableTextBlock & { children?: Span[] };

// Tipe spesifik untuk referensi aset gambar Sanity
type ImageAssetRef = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  caption,
  mainImage,
  body
}`;

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImage) {
  return builder.image(source);
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { currentUser, isLoading } = useUserStore();
  const [post, setPost] = useState<{ _id: string; title: string; caption: string; mainImage?: SanityImage; body?: Block[] } | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isLoading, router]);

  useEffect(() => {
    if (!slug || !currentUser) return;
    const fetchPost = async () => {
      try {
        const fetchedPost = await client.fetch(query, { slug });
        if (fetchedPost) {
          setPost(fetchedPost);
          setTitle(fetchedPost.title);
          setCaption(fetchedPost.caption || "");
          if (fetchedPost.mainImage) {
            setImagePreview(urlFor(fetchedPost.mainImage).url());
          }
          if (fetchedPost.body) {
            const bodyText = fetchedPost.body.map((block: Block) => block.children?.map((child) => child.text).join("")).join("\n\n");
            setBody(bodyText);
          }
        } else {
          setError("Post not found.");
        }
      } catch {
        setError("Failed to load post data.");
      }
    };
    fetchPost();
  }, [slug, currentUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    setIsSubmitting(true);
    setError("");

    try {
      // Definisi tipe untuk data yang akan di-patch
      const patchData: {
        title: string;
        caption: string;
        body: Block[];
        mainImage?: ImageAssetRef;
      } = {
        title,
        caption,
        body: body
          .split("\n")
          .filter((p) => p.trim() !== "")
          .map((paragraph) => ({
            _type: "block",
            style: "normal",
            _key: nanoid(),
            children: [{ _type: "span", _key: nanoid(), text: paragraph, marks: [] }],
          })),
      };

      if (imageFile) {
        const imageAsset = await client.assets.upload("image", imageFile);
        patchData.mainImage = {
          _type: "image",
          asset: { _type: "reference", _ref: imageAsset._id },
        };
      }

      await client.patch(post._id).set(patchData).commit();

      alert("Post updated successfully!");
      router.push(`/blog/${slug}`);
    } catch (error) {
      console.error(error);
      setError("Failed to update post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || (!post && !error)) return <div className="text-center py-20">Loading...</div>;
  if (!currentUser) return null;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">Edit Post</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">
            Post Title
          </label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow border rounded w-full py-3 px-4 bg-gray-700 text-white" />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-300 text-sm font-bold mb-2">
            Change Main Image
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
          <div className="mb-6">
            <p className="block text-gray-300 text-sm font-bold mb-2">Image Preview</p>
            <div className="relative w-full h-64">
              <Image src={imagePreview} alt="Image Preview" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="caption" className="block text-gray-300 text-sm font-bold mb-2">
            Caption
          </label>
          <input id="caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="shadow border rounded w-full py-3 px-4 bg-gray-700 text-white" />
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
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded">
          {isSubmitting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
