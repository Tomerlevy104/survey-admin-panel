import "./AuthFooter.css";

/**
 * AuthFooter
 * Footer used on authentication pages (login, register).
 */
export default function AuthFooter() {
  return (
    <footer className="auth-footer">
      <p className="auth-footer__copyright">
        © 2026 Smart Survey Panel. All rights reserved.
      </p>

      <div className="auth-footer__links">
        <a
          href="https://github.com/Tomerlevy104?tab=repositories"
          className="auth-footer__link"
        >
          Coded by Tomer Levy
        </a>
      </div>
    </footer>
  );
}
