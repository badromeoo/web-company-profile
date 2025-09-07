"use client";

import { useState } from "react";
import Backendless from "@/lib/backendless.client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

 
    const userObject = {
      email: email,
      password: password,
      name: name, 
    };

    try {
      
      await Backendless.UserService.register(userObject);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
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
          onSubmit={handleRegister}
          className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-extrabold text-center mb-6">Create Account</h1>
          
          {success ? (
            <div className="text-green-400 text-center">
              <p>Registration successful!</p>
              <p>Redirecting to login page...</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="name" type="text" placeholder="Your Name"
                  value={name} onChange={(e) => setName(e.target.value)} required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="email" type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password" type="password" placeholder="******************"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
              </div>
              {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                  type="submit" disabled={loading}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </button>
                <Link href="/login" className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-300">
                  Already have an account?
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}