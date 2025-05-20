"use client";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function FindPwdPage() {
  const [step, setStep] = useState<"email" | "code" | "reset" | "done">(
    "email"
  );
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", code: "", password: "" });
  const [sentCode, setSentCode] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // 실제 이메일 인증번호 발송 로직은 여기에 (API 호출 등)
    setTimeout(() => {
      setSentCode(true);
      setStep("code");
      setLoading(false);
    }, 1200);
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // 실제 인증번호 검증 로직은 여기에 (API 호출 등)
    setTimeout(() => {
      setStep("reset");
      setLoading(false);
    }, 1000);
  }

  async function handleResetPwd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // 실제 비밀번호 재설정 로직은 여기에 (API 호출 등)
    setTimeout(() => {
      setStep("done");
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
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
              비밀번호 찾기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {step === "email" && (
                <motion.form
                  key="email"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                  onSubmit={handleSendCode}
                >
                  <div>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="가입한 이메일"
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1 focus:ring-2 focus:ring-pink-400 transition"
                    />
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className="w-full text-base font-semibold tracking-wide bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 transition"
                      size="lg"
                      disabled={loading}
                    >
                      {loading
                        ? "인증번호 발송 중..."
                        : "이메일로 인증번호 받기"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
              {step === "code" && (
                <motion.form
                  key="code"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                  onSubmit={handleVerifyCode}
                >
                  <Alert variant="default" className="mb-2">
                    인증번호가 <b>{form.email}</b>로 발송되었습니다.
                    <br />
                    메일함을 확인해 주세요.
                  </Alert>
                  <div>
                    <Label htmlFor="code">인증번호</Label>
                    <Input
                      id="code"
                      required
                      placeholder="이메일로 받은 인증번호 입력"
                      value={form.code}
                      onChange={handleChange}
                      className="mt-1 focus:ring-2 focus:ring-yellow-400 transition"
                    />
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className="w-full text-base font-semibold tracking-wide bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 transition"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "확인 중..." : "인증번호 확인"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
              {step === "reset" && (
                <motion.form
                  key="reset"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                  onSubmit={handleResetPwd}
                >
                  <Alert variant="default" className="mb-2">
                    인증이 완료되었습니다.
                    <br />새 비밀번호를 입력해 주세요.
                  </Alert>
                  <div>
                    <Label htmlFor="password">새 비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="새 비밀번호"
                      value={form.password}
                      onChange={handleChange}
                      className="mt-1 focus:ring-2 focus:ring-purple-400 transition"
                    />
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className="w-full text-base font-semibold tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 hover:from-purple-500 hover:to-yellow-500 transition"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "변경 중..." : "비밀번호 재설정"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert variant="default" className="mb-4">
                    🎉 비밀번호가 성공적으로 변경되었습니다!
                    <br />
                    <span className="text-xs text-muted-foreground">
                      이제 새로운 비밀번호로 로그인해 주세요.
                    </span>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
