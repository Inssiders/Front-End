"use client";

import { createAccount } from "@/lib/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./SignUpClient.module.css";

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

const steps = [
  { id: "email", title: "이메일 인증", icon: "📧" },
  { id: "code", title: "코드 확인", icon: "🔢" },
  { id: "signup", title: "정보 입력", icon: "👤" },
];

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

  // 현재 스텝의 인덱스
  const currentStepIndex = steps.findIndex(
    (step) => step.id === verificationStep
  );
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  // 이메일 인증 코드 요청
  const handleEmailVerification = async () => {
    const email = getValues("email");
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/server/auth/email/challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

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
      const response = await fetch(`/server/auth/email/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: getValues("email"),
          otp: verificationCode,
        }),
      });

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

      await createAccount({
        email: data.email,
        password: data.password,
        authorizationCode,
      });

      router.push("/auth/signin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    if (stepIndex < currentStepIndex) return "completed";
    if (stepIndex === currentStepIndex) return "active";
    return "pending";
  };

  return (
    <div className={styles.container}>
      {/* 진행 상태 표시기 */}
      <div className={styles.progressSection}>
        {/* 진행 바 */}
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* 스텝 인디케이터 */}
        <div className={styles.stepIndicatorsContainer}>
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <div key={step.id} className={styles.stepIndicatorItem}>
                <div
                  className={`${styles.stepIcon} ${
                    status === "active" ? styles.stepActive : ""
                  } ${status === "completed" ? styles.stepCompleted : ""} ${
                    status === "pending" ? styles.stepPending : ""
                  }`}
                >
                  {status === "completed" ? (
                    <svg
                      className={`${styles.checkmarkIcon} ${styles.checkmark}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className={styles.stepIconContent}>{step.icon}</span>
                  )}
                </div>
                <span className={styles.stepTitle}>{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 헤더 */}
      <div className={styles.headerSection}>
        <h2 className={styles.headerTitle}>
          {verificationStep === "email" && "🚀 이메일 인증"}
          {verificationStep === "code" && "🔐 코드 확인"}
          {verificationStep === "signup" && "⚡ 계정 생성"}
        </h2>
        <p className={styles.headerDescription}>
          {verificationStep === "email" &&
            "✨ 마법같은 여정의 시작을 위해 이메일을 입력하세요"}
          {verificationStep === "code" &&
            "🎯 받으신 6자리 코드로 신원을 확인해주세요"}
          {verificationStep === "signup" &&
            "🔑 안전한 비밀번호로 당신의 공간을 보호하세요"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        {/* 이메일 입력 */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.labelEmail}>
            ✉️ 이메일 주소
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                disabled={verificationStep !== "email"}
                placeholder="your@email.com"
                className={styles.emailInput}
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorMessage}>⚠️ {errors.email.message}</p>
              )}
            </div>
            {verificationStep === "email" && (
              <button
                type="button"
                onClick={handleEmailVerification}
                disabled={isLoading}
                className={styles.actionButton}
              >
                {isLoading ? (
                  <div className={styles.spinnerSmall}></div>
                ) : (
                  "🚀 발송"
                )}
              </button>
            )}
          </div>
        </div>

        {/* 인증 코드 입력 */}
        {verificationStep === "code" && (
          <div className={styles.inputGroup}>
            <label htmlFor="verificationCode" className={styles.labelCode}>
              🔢 인증 코드
            </label>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className={styles.codeInput}
                />
              </div>
              <button
                type="button"
                onClick={handleCodeVerification}
                disabled={isLoading}
                className={styles.actionButton}
              >
                {isLoading ? (
                  <div className={styles.spinnerSmall}></div>
                ) : (
                  "🔍 확인"
                )}
              </button>
            </div>
          </div>
        )}

        {/* 비밀번호 입력 */}
        {verificationStep === "signup" && (
          <div className={styles.passwordSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.labelPassword}>
                🔐 비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="8자 이상, 영문+숫자+특수문자"
                className={styles.passwordInput}
                {...register("password")}
              />
              {errors.password && (
                <p className={styles.errorMessage}>
                  ⚠️ {errors.password.message}
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="passwordConfirm" className={styles.labelConfirm}>
                🔒 비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                className={styles.passwordInput}
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className={styles.errorMessage}>
                  ⚠️ {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinnerLarge}></div>
                  🔄 생성중...
                </>
              ) : (
                "🎉 계정 만들기"
              )}
            </button>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>💥 {error}</p>
          </div>
        )}
      </form>

      {/* 하단 장식 */}
      <div className={styles.footerDecoration}>✨ Powered by Inssider ✨</div>
    </div>
  );
}
