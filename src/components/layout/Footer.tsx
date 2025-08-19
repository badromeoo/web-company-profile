import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 p-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/services" className="hover:text-white">Services</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} MyCompany. All Rights Reserved.</p>
      </div>
    </footer>
  );
}