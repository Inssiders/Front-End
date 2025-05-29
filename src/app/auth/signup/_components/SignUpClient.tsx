"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 유효성 검증 스키마
const signUpSchema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<
    "email" | "code" | "signup"
  >("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  // 이메일 인증 코드 요청
  const handleEmailVerification = async () => {
    const email = getValues("email");
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/api/auth/email/challenge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.detail || "이메일 인증 코드 발송에 실패했습니다."
        );
      }

      setVerificationStep("code");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 코드 확인
  const handleCodeVerification = async () => {
    if (!verificationCode) {
      setError("인증 코드를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/api/auth/email/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: getValues("email"),
            otp: verificationCode,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "인증 코드 확인에 실패했습니다.");
      }

      const data = await response.json();
      setAuthorizationCode(data.data.authorization_code);
      setVerificationStep("signup");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/api/accounts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authorizationCode}`,
          },
          body: JSON.stringify({
            register_type: "password",
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "회원가입에 실패했습니다.");
      }

      router.push("/auth/signin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold">회원가입</h2>
        <p className="mt-2 text-gray-600">
          {verificationStep === "email"
            ? "이메일 인증이 필요합니다."
            : verificationStep === "code"
            ? "인증 코드를 입력해주세요."
            : "회원 정보를 입력해주세요."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* 이메일 입력 */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="email"
              type="email"
              disabled={verificationStep !== "email"}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              {...register("email")}
            />
            {verificationStep === "email" && (
              <button
                type="button"
                onClick={handleEmailVerification}
                disabled={isLoading}
                className="flex-shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
              >
                인증 요청
              </button>
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* 인증 코드 입력 */}
        {verificationStep === "code" && (
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700"
            >
              인증 코드
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="6자리 인증 코드"
              />
              <button
                type="button"
                onClick={handleCodeVerification}
                disabled={isLoading}
                className="flex-shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* 비밀번호 입력 */}
        {verificationStep === "signup" && (
          <>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            >
              {isLoading ? "처리 중..." : "회원가입"}
            </button>
          </>
        )}

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
