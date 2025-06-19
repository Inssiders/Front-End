import { Github } from "lucide-react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* 장식 요소들 */}
      <div className={styles.decorativeElements}>
        <div className={`${styles.decorativeParticle} ${styles.particle1}`} />
        <div className={`${styles.decorativeParticle} ${styles.particle2}`} />
        <div className={`${styles.decorativeParticle} ${styles.particle3}`} />
      </div>

      <div className={`container mx-auto px-4 py-4 ${styles.footerContainer}`}>
        <div className={styles.footerContent}>
          {/* 로고 섹션 */}
          <div className={styles.logoSection}>
            <h3 className={styles.logoText}>inSSider</h3>
            <p className={styles.logoSubtext}>밈 트렌드의 중심 ✨</p>
          </div>

          {/* 링크 섹션 */}
          <div className={styles.linksSection}>
            <Link href="/terms" className={styles.link}>
              이용약관
            </Link>
          </div>

          {/* 저작권 및 소셜 링크 */}
          <div className={styles.copyrightSection}>
            <p className={styles.copyright}>© 2025 inSSider. All rights reserved.</p>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/Inssiders"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              {/* <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter size={14} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
