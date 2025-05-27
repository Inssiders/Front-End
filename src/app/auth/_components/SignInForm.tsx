"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Check, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignInFormProps {
  onLoginFail?: () => void;
}

interface SignInFields {
  email: string;
  password: string;
}

export default function SignInForm({ onLoginFail }: SignInFormProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<SignInFields>({
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (values: SignInFields) => {
    setError("");
    try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
        grant_type: "password",
      redirect: false,
        callbackUrl: "/",
    });

      if (!res?.error) {
      router.push("/");
    } else {
      setError("로그인 실패! 아이디/비밀번호를 확인하세요.");
        onLoginFail?.();
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      onLoginFail?.();
    }
  };

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 w-full"
        initial={false}
        animate={error ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <FormField
          name="email"
          control={form.control}
          rules={{
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "올바른 이메일 주소를 입력하세요.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 dark:text-gray-200">
                이메일
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="이메일"
                  autoComplete="username"
                  className="bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-400/20 dark:focus:ring-purple-500/20 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          rules={{
            required: "비밀번호를 입력하세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 dark:text-gray-200">
                비밀번호
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  className="bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 focus:border-pink-400 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-400/20 dark:focus:ring-pink-500/20 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant="destructive" className="text-center font-medium">
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          className="w-full py-3 rounded-xl bg-purple-500/90 hover:bg-purple-500
          text-white font-bold text-lg
          transition-all duration-300
          shadow-lg hover:shadow-xl active:shadow-md
          disabled:opacity-70
          group relative"
          size="lg"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="relative w-6 h-6 overflow-hidden">
              <span className="absolute inset-0 transform transition-transform duration-300 ease-in-out group-hover:-translate-y-full flex items-center justify-center">
                <LogIn className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </span>
            </span>
            로그인
          </span>
        </Button>
      </motion.form>
    </Form>
  );
}
