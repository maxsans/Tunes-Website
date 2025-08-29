import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleEmailClick = () => {
    window.location.href = "mailto:mcmservicesoff@gmail.com";
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/maxsans", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>Tunes</h3>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.contactInfo}>
              <h4 className={styles.sectionTitle}>Contact</h4>
              <button
                className={styles.emailLink}
                onClick={handleEmailClick}
                aria-label="Send email to mcmservicesoff@gmail.com"
              >
                📧 mcmservicesoff@gmail.com
              </button>
            </div>

            <div className={styles.socialLinks}>
              <h4 className={styles.sectionTitle}>Follow Us</h4>
              <div className={styles.socialButtons}>
                <button
                  className={styles.socialButton}
                  onClick={handleGitHubClick}
                  aria-label="Visit our GitHub profile"
                >
                  🔗 GitHub
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} Tunes. All rights reserved.
            </p>
          </div>

          <div className={styles.legalLinks}>
            <span className={styles.version}>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
