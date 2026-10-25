import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Signup from "./Auth/Signup";
import "./SiteEngagementPrompt.css";

const REGISTRATION_COMPLETE_KEY = "vertex_registration_prompt_completed";
const WELCOME_SEEN_KEY = "vertex_welcome_seen";

function isPromptEligible(pathname) {
  return !(
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings")
  );
}

export default function SiteEngagementPrompt() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const eligible = isPromptEligible(pathname);
  const [showWelcome, setShowWelcome] = useState(
    () => eligible
      && !sessionStorage.getItem(WELCOME_SEEN_KEY)
      && !localStorage.getItem(REGISTRATION_COMPLETE_KEY)
  );
  const [showSignup, setShowSignup] = useState(false);
  const clickCount = useRef(0);

  useEffect(() => {
    if (!showWelcome || !eligible || isAuthenticated) return undefined;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(WELCOME_SEEN_KEY, "true");
      setShowWelcome(false);
      setShowSignup(true);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [eligible, isAuthenticated, showWelcome]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        !eligible ||
        isAuthenticated ||
        showWelcome ||
        showSignup ||
        localStorage.getItem(REGISTRATION_COMPLETE_KEY) ||
        event.target.closest(".registration-prompt")
      ) return;

      clickCount.current += 1;
      if (clickCount.current >= 4) {
        clickCount.current = 0;
        setShowSignup(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [eligible, isAuthenticated, showSignup, showWelcome]);

  const completeRegistration = () => {
    localStorage.setItem(REGISTRATION_COMPLETE_KEY, "true");
  };

  return (
    <>
      {showWelcome && eligible && !isAuthenticated && (
        <div className="site-welcome" role="status" aria-live="polite">
          <div className="site-welcome__content">
            <span className="site-welcome__brand">360° VERTEX SOLUTIONS</span>
            <p>Build Your Business. Boost Your Brand. Grow Without Limits.</p>
            <span className="site-welcome__loader" aria-hidden="true" />
          </div>
        </div>
      )}
      {showSignup && eligible && !isAuthenticated && (
        <Signup
          isModal
          onClose={() => setShowSignup(false)}
          onComplete={completeRegistration}
        />
      )}
    </>
  );
}
