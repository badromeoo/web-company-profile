import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import type { PortableTextBlock } from "sanity";
import type { Image as SanityImage } from "sanity";
import PostActions from "@/components/PostActions";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  caption: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImage) {
  return builder.image(source);
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  caption,
  publishedAt,
  body,
  slug,
}`;

// PERBAIKAN FINAL DAN DEFINITIF PADA TANDA TANGAN FUNGSI
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post: Post = await client.fetch(query, { slug });

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
        {post.title}
      </h1>
      
      <p className="text-center text-gray-400 mb-8">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      
      {post.mainImage && (
        <figure className="mb-8">
          <div className="relative w-full h-96">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          {post.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {post.caption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="prose prose-invert max-w-none prose-lg">
        <PortableText value={post.body} />
      </div>

      <PostActions postId={post._id} />
    </article>
  );
}