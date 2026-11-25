import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./IntroAnimation.css";

const wordmark = "360° VERTEX SOLUTIONS";
const tagline = "Your Skills. Your Career. Your Future. All in 360°.";

export default function IntroAnimation({ onComplete }) {
  const introRef = useRef(null);
  const ringRef = useRef(null);
  const particlesRef = useRef([]);
  const logoRef = useRef(null);
  const lettersRef = useRef([]);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Never block the site if the animation cannot run.
    if (prefersReducedMotion || typeof gsap === "undefined") {
      onComplete?.();
      return undefined;
    }

    // Safety net: complete the intro even if the timeline fails.
    const fallback = window.setTimeout(() => onComplete?.(), 2600);

    const context = gsap.context(() => {
      gsap
        .timeline({ onComplete })
        // 0.0 – 0.3s — dark backdrop + particles + forming 360° graphic
        .fromTo(introRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" }, 0)
        .fromTo(
          particlesRef.current,
          { autoAlpha: 0, scale: 0.4 },
          { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.03, ease: "power2.out" },
          0.05,
        )
        .fromTo(ringRef.current, { autoAlpha: 0, rotate: -35 }, { autoAlpha: 1, rotate: 0, duration: 0.5, ease: "power2.out" }, 0.05)
        // 0.3 – 0.8s — logo fades in, scales 0.7 → 1.0 with neon glow
        .fromTo(
          logoRef.current,
          { autoAlpha: 0, scale: 0.7 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          0.3,
        )
        // 0.8 – 1.4s — brand name letter by letter
        .fromTo(
          lettersRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.018, ease: "power2.out" },
          0.8,
        )
        // 0.8 – 1.4s — tagline staggered fade-in
        .fromTo(
          taglineRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          1.0,
        )
        // 1.4 – 1.8s — loading line, then fade the content out
        .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: "power2.inOut" }, 1.25)
        .to(
          [logoRef.current, ringRef.current, taglineRef.current, ...lettersRef.current],
          { autoAlpha: 0, y: -6, duration: 0.3, ease: "power2.in" },
          1.45,
        )
        .to(progressRef.current, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 1.6)
        // 1.8 – 2.0s — overlay transitions out
        .to(introRef.current, { autoAlpha: 0, duration: 0.38, ease: "power2.inOut" }, 1.62);
    }, introRef);

    return () => {
      window.clearTimeout(fallback);
      context.revert();
    };
  }, [onComplete]);

  return (
    <div className="vx-intro" ref={introRef} role="presentation" aria-hidden="true">
      <div className="vx-intro__particles" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            ref={(element) => {
              particlesRef.current[index] = element;
            }}
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="vx-intro__content">
        <div className="vx-intro__orbit" aria-hidden="true">
          <svg viewBox="0 0 200 200" width="100%" height="100%" ref={ringRef}>
            <circle className="vx-intro__ring vx-intro__ring--outer" cx="100" cy="100" r="92" />
            <circle className="vx-intro__ring vx-intro__ring--inner" cx="100" cy="100" r="72" />
          </svg>
          <img
            className="vx-intro__logo"
            src="/vertex-solutions-logo.png"
            alt=""
            ref={logoRef}
          />
        </div>

        <p className="vx-intro__wordmark" aria-label={wordmark}>
          {Array.from(wordmark, (letter, index) => (
            <span
              key={`${letter}-${index}`}
              ref={(element) => {
                lettersRef.current[index] = element;
              }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </p>

        <p className="vx-intro__tagline" ref={taglineRef}>
          {tagline}
        </p>

        <div className="vx-intro__track">
          <span className="vx-intro__progress" ref={progressRef} />
        </div>
      </div>
    </div>
  );
}
