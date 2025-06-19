"use client";

import { createAccount } from "@/lib/auth-actions";
import {
  getPasswordRequirements,
  getPasswordStrength,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "@/lib/validation";
import { authApi } from "@/utils/fetch/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./SignUpClient.module.css";

// 유효성 검증 스키마 (간단한 형태로 유지)
const signUpSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(64, "비밀번호는 최대 64자 이하여야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
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
  const [verificationStep, setVerificationStep] = useState<"email" | "code" | "signup">("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [expiresIn, setExpiresIn] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // 실시간 유효성 검증
  });

  // 실시간 필드 감시
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");

  // 현재 스텝의 인덱스
  const currentStepIndex = steps.findIndex((step) => step.id === verificationStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  // 이메일 유효성 검증 상태
  const isEmailValid = emailValue && validateEmail(emailValue) && !errors.email;

  // 패스워드 강도 및 요구사항
  const passwordStrength = passwordValue ? getPasswordStrength(passwordValue) : { score: 0, feedback: "" };
  const passwordRequirements = passwordValue
    ? getPasswordRequirements(passwordValue)
    : {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
        noSpaces: false,
      };

  // 실시간 피드백 메시지
  const passwordValidation = passwordValue ? validatePassword(passwordValue) : null;
  const passwordConfirmResult =
    passwordValue && passwordConfirmValue ? validatePasswordConfirm(passwordValue, passwordConfirmValue) : null;

  // 이메일 인증 요청
  const requestEmailVerification = async () => {
    const email = getValues("email");
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.sendEmailChallenge(email);
      if (response.data) {
        setEmailSent(true);
        setExpiresIn(response.data.expires_in);
        setVerificationStep("code");
      } else {
        setError(response.message || "이메일 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Email verification request error:", error);
      setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 코드 확인
  const verifyEmail = async (otp: string) => {
    setIsVerifying(true);
    setError("");

    try {
      const response = await authApi.verifyEmail(getValues("email"), otp);
      if (response.data?.verified) {
        setAuthorizationCode(response.data.authorization_code);
        setVerificationStep("signup");
      } else {
        setError(response.message || "인증에 실패했습니다.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("인증에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsVerifying(false);
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);

      // 1. 인가 코드로 JWT 토큰 발급
      const tokenResponse = await authApi.loginWithEmail(authorizationCode);

      if (!tokenResponse.data?.access_token) {
        throw new Error("토큰 발급에 실패했습니다.");
      }

      // 2. JWT 토큰으로 계정 생성
      await createAccount({
        email: data.email,
        password: data.password,
        accessToken: tokenResponse.data.access_token,
      });

      // 3. NextAuth로 자동 로그인
      const result = await signIn("credentials", {
        accessToken: tokenResponse.data.access_token,
        refreshToken: tokenResponse.data.refresh_token,
        tokenType: tokenResponse.data.token_type,
        expiresIn: tokenResponse.data.expires_in,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        setError("자동 로그인에 실패했습니다. 수동으로 로그인해주세요.");
        router.push("/auth/signin");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
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
          <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
          {verificationStep === "email" && "✨ 마법같은 여정의 시작을 위해 이메일을 입력하세요"}
          {verificationStep === "code" && "🎯 받으신 6자리 코드로 신원을 확인해주세요"}
          {verificationStep === "signup" && "🔑 안전한 비밀번호로 당신의 공간을 보호하세요"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        {/* 이메일 입력 단계 */}
        {verificationStep === "email" && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.labelEmail}>
                ✉️ 이메일 주소
              </label>
              <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className={`${styles.emailInput} ${
                      emailValue && !isEmailValid ? styles.inputError : ""
                    } ${emailValue && isEmailValid ? styles.inputSuccess : ""}`}
                    {...register("email")}
                  />
                </div>
                <button
                  type="button"
                  onClick={requestEmailVerification}
                  disabled={isLoading || !isEmailValid}
                  className={styles.actionButton}
                >
                  {isLoading ? <div className={styles.spinnerSmall}></div> : "📨 인증 요청"}
                </button>
              </div>
              {errors.email && <p className={styles.errorMessage}>⚠️ {errors.email.message}</p>}
              {emailValue && isEmailValid && <p className={styles.successMessage}>✅ 올바른 이메일 형식입니다!</p>}
            </div>
          </>
        )}

        {/* 인증 코드 입력 단계 */}
        {verificationStep === "code" && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.labelEmail}>
                ✉️ 이메일 주소
              </label>
              <div className={styles.inputWrapper}>
                <input id="email" type="email" disabled className={styles.emailInput} {...register("email")} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="verificationCode" className={styles.labelCode}>
                🔢 인증 코드{" "}
                {expiresIn > 0 && <span className={styles.expireTime}>({Math.floor(expiresIn / 60)}분 내 입력)</span>}
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
                  onClick={() => verifyEmail(verificationCode)}
                  disabled={isVerifying || verificationCode.length !== 6}
                  className={styles.actionButton}
                >
                  {isVerifying ? <div className={styles.spinnerSmall}></div> : "🔍 검증"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* 회원가입 정보 입력 단계 */}
        {verificationStep === "signup" && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.labelEmail}>
                ✉️ 이메일 주소 (인증 완료)
              </label>
              <div className={styles.inputWrapper}>
                <input id="email" type="email" disabled className={styles.emailInput} {...register("email")} />
              </div>
            </div>
          </>
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
                placeholder="KISA 기준 안전한 비밀번호"
                className={`${styles.passwordInput} ${
                  passwordValue && !passwordValidation?.isValid ? styles.inputError : ""
                } ${passwordValue && passwordValidation?.isValid ? styles.inputSuccess : ""}`}
                {...register("password")}
              />
              {errors.password && <p className={styles.errorMessage}>⚠️ {String(errors.password.message)}</p>}

              {/* 패스워드 강도 표시 */}
              {passwordValue && (
                <div className={styles.passwordStrengthContainer}>
                  <div className={styles.strengthIndicator}>
                    <div className={styles.strengthBars}>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`${styles.strengthBar} ${
                            level <= passwordStrength.score
                              ? level <= 2
                                ? styles.strengthWeak
                                : level <= 4
                                  ? styles.strengthMedium
                                  : styles.strengthStrong
                              : styles.strengthEmpty
                          }`}
                        />
                      ))}
                    </div>
                    <span className={styles.strengthText}>{passwordStrength.feedback}</span>
                  </div>

                  {/* KISA 기준 요구사항 체크리스트 */}
                  <div className={styles.passwordRequirements}>
                    <div className={styles.requirementTitle}>📋 KISA 안전한 패스워드 기준</div>
                    <div className={styles.requirementsList}>
                      <div
                        className={`${styles.requirement} ${passwordRequirements.length ? styles.requirementMet : styles.requirementNotMet}`}
                      >
                        <span className={styles.requirementIcon}>{passwordRequirements.length ? "✅" : "❌"}</span>
                        <span className={styles.requirementText}>8~64자 길이</span>
                      </div>
                      <div
                        className={`${styles.requirement} ${passwordRequirements.lowercase ? styles.requirementMet : styles.requirementNotMet}`}
                      >
                        <span className={styles.requirementIcon}>{passwordRequirements.lowercase ? "✅" : "❌"}</span>
                        <span className={styles.requirementText}>영문 소문자 (a-z)</span>
                      </div>
                      <div
                        className={`${styles.requirement} ${passwordRequirements.uppercase ? styles.requirementMet : styles.requirementNotMet}`}
                      >
                        <span className={styles.requirementIcon}>{passwordRequirements.uppercase ? "✅" : "❌"}</span>
                        <span className={styles.requirementText}>영문 대문자 (A-Z)</span>
                      </div>
                      <div
                        className={`${styles.requirement} ${passwordRequirements.number ? styles.requirementMet : styles.requirementNotMet}`}
                      >
                        <span className={styles.requirementIcon}>{passwordRequirements.number ? "✅" : "❌"}</span>
                        <span className={styles.requirementText}>숫자 (0-9)</span>
                      </div>
                      <div
                        className={`${styles.requirement} ${passwordRequirements.special ? styles.requirementMet : styles.requirementNotMet}`}
                      >
                        <span className={styles.requirementIcon}>{passwordRequirements.special ? "✅" : "❌"}</span>
                        <span className={styles.requirementText}>특수문자 (!@#$%^&* 등)</span>
                      </div>
                      <div
                        className={`${styles.requirement} ${passwordRequirements.noSpaces ? styles.requirementMet : styles.requirementNotMet}`}
                      >
                        <span className={styles.requirementIcon}>{passwordRequirements.noSpaces ? "✅" : "❌"}</span>
                        <span className={styles.requirementText}>공백 없음</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                className={`${styles.passwordInput} ${
                  passwordConfirmValue && !passwordConfirmResult?.isValid ? styles.inputError : ""
                } ${passwordConfirmValue && passwordConfirmResult?.isValid ? styles.inputSuccess : ""}`}
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className={styles.errorMessage}>⚠️ {String(errors.passwordConfirm.message)}</p>
              )}
              {passwordConfirmValue && passwordConfirmResult && !passwordConfirmResult.isValid && (
                <p className={styles.errorMessage}>⚠️ {passwordConfirmResult.message}</p>
              )}
              {passwordConfirmValue && passwordConfirmResult?.isValid && (
                <p className={styles.successMessage}>✅ 비밀번호가 일치합니다!</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !passwordValidation?.isValid || !passwordConfirmResult?.isValid}
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
