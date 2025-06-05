import { Metadata } from "next";
import SignUpClient from "./_components/SignUpClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Inssider 회원가입",
  description: "Inssider 회원가입",
};

export default function SignUpPage() {
  return (
    <div className={styles.pageContainer}>
      {/* 떠다니는 파티클 효과 */}
      <div className={styles.floatingParticles}>
        <div className={`${styles.particle} ${styles.particle1}`}></div>
        <div className={`${styles.particle} ${styles.particle2}`}></div>
        <div className={`${styles.particle} ${styles.particle3}`}></div>
        <div className={`${styles.particle} ${styles.particle4}`}></div>
        <div className={`${styles.particle} ${styles.particle5}`}></div>
        <div className={`${styles.particle} ${styles.particle6}`}></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className={styles.contentContainer}>
        {/* 헤더 섹션 */}
        <div className={styles.headerSection}>
          {/* 브랜드 아이콘 */}
          <div className={styles.brandIcon}>
            <svg
              className={styles.brandIconSvg}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* 타이틀 */}
          <h1 className={styles.mainTitle}>Inssider</h1>
          <div className={styles.subtitle}>회원가입</div>
          <p className={styles.description}>
            ✨ 차세대 밈 콘텐츠의 세계로
            <br />
            <span className={styles.highlightText}>당신을 초대합니다</span> 🚀
          </p>
        </div>

        {/* 회원가입 폼 */}
        <SignUpClient />

        {/* 로그인 링크 */}
        <div className={styles.loginSection}>
          <p className={styles.loginText}>이미 계정이 있으신가요?</p>
          <a href="/auth/signin" className={styles.loginButton}>
            로그인하기
          </a>
        </div>
      </div>
    </div>
  );
}
