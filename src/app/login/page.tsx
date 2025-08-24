"use client";

import { useState } from "react";
import Backendless from "@/lib/backendless.client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/userStore"; // <-- 1. IMPOR useUserStore

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCurrentUser } = useUserStore(); // <-- 2. AMBIL FUNGSI setCurrentUser

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await Backendless.UserService.login(email, password, true);
      console.log("User logged in:", user);

      setCurrentUser(user); // <-- 3. PERBARUI STATE GLOBAL DI SINI

      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      let message = "An unknown error occurred.";
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: string }).message === 'string') {
        message = (err as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-extrabold text-center mb-6">Login</h1>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
            <Link
              href="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-300"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}