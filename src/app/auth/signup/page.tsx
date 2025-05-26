"use client";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { register, requestEmailVerification } from "@/utils/fetch";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, KeyRound, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [form, setForm] = useState({ nickname: "", email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSendVerification(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;

    try {
      setLoading(true);
      await requestEmailVerification(form.email);
      setVerificationSent(true);
      toast.success("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (verificationCode.length !== 6) return;

    try {
      setLoading(true);
      // TODO: 실제 인증번호 확인 API 구현 필요
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsVerified(true);
      toast.success("인증이 완료되었습니다");
    } catch (error) {
      toast.error("인증번호를 다시 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isVerified) return;

    try {
      setLoading(true);
      await register(form);
      setRegisterSuccess(true);
      toast.success("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
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
              회원가입
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {registerSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert variant="default" className="mb-4">
                    🎉 회원가입이 완료되었습니다! <br />
                    <span className="text-xs text-muted-foreground">
                      로그인 페이지로 이동해 주세요.
                    </span>
                  </Alert>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Label htmlFor="nickname">닉네임</Label>
                    <Input
                      id="nickname"
                      required
                      placeholder="닉네임을 입력하세요"
                      value={form.nickname}
                      onChange={handleChange}
                      className="mt-1 focus:ring-2 focus:ring-purple-400 transition"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        이메일
                        {isVerified && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            인증완료
                          </Badge>
                        )}
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="이메일"
                          value={form.email}
                          onChange={handleChange}
                          disabled={verificationSent}
                          className="focus:ring-2 focus:ring-pink-400 transition"
                        />
                        {!verificationSent && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  onClick={handleSendVerification}
                                  disabled={loading || !form.email}
                                  className="whitespace-nowrap bg-pink-500 hover:bg-pink-600"
                                >
                                  {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Mail className="w-4 h-4" />
                                  )}
                                  <span className="ml-2">인증번호 발송</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>입력하신 이메일로 인증번호가 발송됩니다</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>

                    {verificationSent && !isVerified && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <Separator />
                        <div className="space-y-2">
                          <Label
                            htmlFor="verificationCode"
                            className="flex items-center gap-2"
                          >
                            인증번호
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    이메일로 발송된 6자리 인증번호를
                                    입력해주세요
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <div className="flex flex-col gap-4">
                            <InputOTP
                              value={verificationCode}
                              onChange={setVerificationCode}
                              maxLength={6}
                              render={({ slots }) => (
                                <InputOTPGroup>
                                  {slots.map((slot, index) => (
                                    <InputOTPSlot
                                      key={index}
                                      index={index}
                                      {...slot}
                                    />
                                  ))}
                                </InputOTPGroup>
                              )}
                            />
                            <Button
                              type="button"
                              onClick={handleVerifyCode}
                              disabled={
                                loading || verificationCode.length !== 6
                              }
                              className="w-full bg-pink-500 hover:bg-pink-600"
                            >
                              {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <KeyRound className="w-4 h-4" />
                              )}
                              <span className="ml-2">인증번호 확인</span>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
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
                      disabled={loading || !isVerified}
                    >
                      {loading ? "가입 중..." : "회원가입"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
