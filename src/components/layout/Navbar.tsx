"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import Backendless from "@/lib/backendless.client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { currentUser, setCurrentUser, isLoading } = useUserStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await Backendless.UserService.logout();
      setCurrentUser(null);
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Tagline */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            MyCompany
          </Link>
          <p className="text-xs text-gray-400">Building the Future.</p>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-white">About Us</Link>
          <Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link>
          {isLoading ? (
            <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
          ) : currentUser ? (
            <>
              <Link href="/create-blog" className="text-gray-300 hover:text-white">Create Post</Link>
              <span className="text-white">Hi, {currentUser.name || currentUser.email}</span>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</Link>
            </>
          )}
        </div>

        {/* --- Hamburger Button (Mobile) --- */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Panel --- */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/blog" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <hr className="border-gray-700"/>
            {isLoading ? (
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
            ) : currentUser ? (
              <>
                <Link href="/create-blog" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Create Post</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="bg-red-600 text-white font-bold py-2 px-4 rounded text-left">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/register" className="bg-blue-600 text-white font-bold py-2 px-4 rounded text-center" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}