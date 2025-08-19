import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import type { PortableTextBlock } from "sanity";
import type { Image as SanityImage } from "sanity"; 

//tipe data untuk satu Post
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImage; 
  body: PortableTextBlock[];
}

// image URL builder
const builder = imageUrlBuilder(client);


function urlFor(source: SanityImage) {
  return builder.image(source);
}

//query GROQ untuk mengambil satu post berdasarkan slug chat gpt ini hehe
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  body
}`;

// menerima `params` yang berisi slug dari URL
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
        {post.title}
      </h1>

      {post.mainImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill 
            style={{ objectFit: "cover" }} 
            className="rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none prose-lg">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}