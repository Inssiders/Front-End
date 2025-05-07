"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      setError("로그인 실패. 아이디/비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">로그인</h1>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
