import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";

// Definisikan tipe data untuk Post
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

// Buat query GROQ untuk mengambil semua post
const query = groq`*[_type == "post"]{
  _id,
  title,
  slug
}`;

// Halaman ini menjadi async untuk mengambil data
export default async function BlogPage() {
  const posts: Post[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        The Company Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition"
          >
            <h2 className="text-2xl font-bold text-blue-400">{post.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}