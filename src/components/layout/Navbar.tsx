import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          MyCompany
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About Us
          </Link>
          <Link href="/services" className="text-gray-300 hover:text-white">
            Services
          </Link>
          <Link href="/teams" className="text-gray-300 hover:text-white">
            Teams
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-white">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}