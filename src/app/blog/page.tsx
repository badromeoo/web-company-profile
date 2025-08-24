import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { Image as SanityImage } from "sanity";
import type { PortableTextBlock } from "sanity";

// Definisikan tipe yang lebih spesifik
type Span = { _type: "span"; text: string };
type Block = PortableTextBlock & { children?: Span[] };

interface Author {
  name: string;
  image: SanityImage;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  author: Author;
  publishedAt: string;
  body: Block[]; // Gunakan tipe Block yang spesifik
}

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Perbaiki tipe data di sini
function createSummary(body: Block[]): string {
  if (!body) return "";
  const firstTextBlock = body.find((block) => block._type === "block" && block.children?.some((child) => child.text));
  if (!firstTextBlock || !firstTextBlock.children) return "";
  return firstTextBlock.children.map((span) => span.text).join("");
}

const query = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  author->{
    name,
    image
  },
  publishedAt,
  body
}`;

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12">The Company Blog</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const summary = createSummary(post.body);

          return (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="block bg-gray-800 rounded-lg overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="relative w-full h-48">
                {post.mainImage && <Image src={urlFor(post.mainImage).url()} alt={post.title} fill style={{ objectFit: "cover" }} className="transition-transform duration-300 group-hover:scale-110" />}
              </div>

              <div className="p-4 flex flex-col justify-between" style={{ height: "10rem" }}>
                <div>
                  <h2 className="text-xl font-bold text-blue-400 mb-2 truncate">{post.title}</h2>
                  {summary && <p className="text-gray-400 text-sm line-clamp-3">{summary}</p>}
                </div>

                <div className="flex items-center mt-2">
                  {post.author?.image && (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                      <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{post.author?.name || "Unknown Author"}</p>
                    <p className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
