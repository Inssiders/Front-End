"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MemeCard from "./MemeCard";

const MEMES = [
  {
    img: "/gif/1.gif",
    text: "뉴진스 😂 - 귀엽고 엉뚱한 순간!",
    source: "예능: 런닝맨 속 깜짝 등장 장면",
  },
  {
    img: "/gif/2.gif",
    text: "뉴진스 🐶 - 강아지처럼 상큼한 매력!",
    source: "K-pop: BTS 무대 리액션 중 뉴진스 언급",
  },
  {
    img: "/gif/3.gif",
    text: "상속자들 이민호 😢 - 상처받은 재벌 2세의 눈물",
    source: "드라마: 사랑의 불시착 패러디 씬",
  },
  {
    img: "/gif/4.gif",
    text: "시크릿가든 현빈 😜 - 영혼이 바뀌어 당황한 순간!",
    source: "예능: 무한도전 패러디 코너",
  },
  {
    img: "/gif/5.gif",
    text: "지드래곤 - 스타일과 자신감의 끝판왕 👑",
    source: "K-pop: BLACKPINK 콘서트 깜짝 등장",
  },
  {
    img: "/gif/6.gif",
    text: "트와이스 👻 - 깜짝 놀라는 순간도 상큼하게!",
    source: "드라마: 도깨비에 특별출연한 장면 패러디",
  },
  {
    img: "/gif/7.gif",
    text: "이상한 변호사 우영우 😂 - 엉뚱하지만 천재적인 순간!",
    source: "예능: 런닝맨 퀴즈 미션 중 우영우 컨셉",
  },
  {
    img: "/gif/8.gif",
    text: "오징어게임 🐶 - 생존 게임 속 귀여운 반전",
    source: "예능: 런닝맨의 오징어게임 패러디",
  },
  {
    img: "/gif/9.gif",
    text: "오징어게임 😢 - 충격 반전의 감정 폭발",
    source: "드라마: 사랑의 불시착과 크로스오버 패러디",
  },
];

export default function SignInClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const meme = MEMES[currentIdx];
  const isMobile = useMobile();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MEMES.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        grant_type: "password",
        redirect: false,
        callbackUrl: "/",
      });

      if (!result?.error) {
        toast.success("로그인 성공! 메인 페이지로 이동합니다.");
        router.push("/");
      } else {
        toast.error("이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "이메일 또는 비밀번호를 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center relative overflow-hidden">
      {/* 움직이는 배경 + floating shapes (only desktop) */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-10 left-10 w-24 h-24 rounded-full bg-pink-300/30 z-0"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-300/30 z-0"
            animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <div className="flex w-full h-3/5 max-w-5xl mx-auto flex-row items-center justify-center gap-0 z-10">
        {/* 밈 카드 - 데스크탑에서만 보임 */}
        {!isMobile && (
          <div className="hidden md:flex flex-1 h-full w-full items-center justify-center">
            <MemeCard {...meme} />
          </div>
        )}
        {/* 로그인 폼 - 모바일/데스크탑 모두 보임 */}
        <div className="flex-1 h-full w-full flex items-center justify-center">
          <motion.div
            className="w-full h-full mx-4 p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 border-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 dark:text-purple-200 tracking-tight drop-shadow">
              Inssider Login
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <Card className="shadow-xl rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      INSSIDER
                    </Badge>
                    로그인
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="이메일"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 focus:ring-2 focus:ring-pink-400 transition"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">비밀번호</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 focus:ring-2 focus:ring-yellow-400 transition"
                      />
                    </div>
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        className="w-full text-base font-semibold tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 hover:from-purple-500 hover:to-yellow-500 transition"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            로그인 중...
                          </>
                        ) : (
                          "로그인"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <div className="mt-8 text-center text-xs text-gray-400">
              아직 회원이 아니신가요?{" "}
              <Link
                href="/auth/signup"
                className="underline text-purple-500 font-bold"
              >
                회원가입
              </Link>
            </div>
            <div className="mt-5 text-center text-xs text-gray-400">
              비밀번호를 잊으셨나요?{" "}
              <Link
                href="/auth/find-pwd"
                className="underline text-purple-500 font-bold"
              >
                비밀번호 찾기
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
