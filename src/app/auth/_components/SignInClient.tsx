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
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// 동적 import로 MemeCard를 로드 (데스크탑에서만 필요)
const MemeCard = dynamic(() => import("./MemeCard"), {
  loading: () => <div className="w-80 h-96 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse rounded-2xl" />,
});

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
        grant_type: "PASSWORD",
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
      toast.error(error instanceof Error ? error.message : "이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex h-screen min-h-screen items-center justify-center overflow-hidden">
      {/* 움직이는 배경 + floating shapes (only desktop) */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-10 top-10 z-0 size-24 rounded-full bg-pink-300/30"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 z-0 size-32 rounded-full bg-purple-300/30"
            animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <div className="z-10 mx-auto flex h-3/5 w-full max-w-5xl flex-row items-center justify-center gap-0">
        {/* 밈 카드 - 데스크탑에서만 보임 */}
        {!isMobile && (
          <div className="hidden size-full flex-1 items-center justify-center md:flex">
            <MemeCard {...meme} />
          </div>
        )}
        {/* 로그인 폼 - 모바일/데스크탑 모두 보임 */}
        <div className="flex size-full flex-1 items-center justify-center">
          <motion.div
            className="mx-4 flex size-full flex-col items-center justify-center rounded-3xl border-0 bg-white/90 p-8 shadow-2xl dark:bg-gray-900/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-purple-700 drop-shadow dark:text-purple-200">
              Inssider Login
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <Card className="rounded-2xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="px-2 py-1 text-xs">
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
                        className="mt-1 transition focus:ring-2 focus:ring-pink-400"
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
                        className="mt-1 transition focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-base font-semibold tracking-wide transition hover:from-purple-500 hover:to-yellow-500"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
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
              <Link href="/auth/signup" className="font-bold text-purple-500 underline">
                회원가입
              </Link>
            </div>
            <div className="mt-5 text-center text-xs text-gray-400">
              비밀번호를 잊으셨나요?{" "}
              <Link href="/auth/find-pwd" className="font-bold text-purple-500 underline">
                비밀번호 찾기
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
