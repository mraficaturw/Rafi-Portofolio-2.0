import { useEffect, useState, useRef } from 'react';

const words = ["Hello", "Bonjour", "Ciao", "Olá", "やあ", "Hallå", "Guten tag", "こんにちは"];

function getWindowDimension() {
  if (typeof window === 'undefined') return { width: 1920, height: 1080 };
  return { width: window.innerWidth, height: window.innerHeight };
}

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState(getWindowDimension);
  const [isExiting, setIsExiting] = useState(false);
  const [curveY, setCurveY] = useState(300); // offset for quadratic curve
  const animRef = useRef(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setDimension(getWindowDimension());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll during preloader
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Words cycling animation
  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);

        // Animate the SVG curve flat as it slides up
        const startTime = performance.now();
        const duration = 700; // ms

        const animateCurve = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease cubic out
          const ease = 1 - Math.pow(1 - progress, 3);
          setCurveY(300 * (1 - ease));

          if (progress < 1) {
            animRef.current = requestAnimationFrame(animateCurve);
          }
        };

        animRef.current = requestAnimationFrame(animateCurve);

        // Call onComplete after exit animation completes
        setTimeout(() => {
          try {
            sessionStorage.setItem('hasSeenPreloader', 'true');
          } catch {
            // ignore if private mode / storage unavailable
          }
          onComplete?.();
        }, 1000);
      }, 1000);

      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 1000 : 150
    );

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const pathD = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + curveY} 0 ${dimension.height} L0 0`;

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black z-[99999999999]"
      style={{
        transform: isExiting ? 'translateY(-100vh)' : 'translateY(0)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.2s',
        willChange: 'transform'
      }}
    >
      {dimension.width > 0 && (
        <>
          <p
            className="flex items-center text-white text-4xl md:text-5xl lg:text-6xl absolute z-10 font-medium"
            style={{
              opacity: isExiting ? 0 : 0.85,
              transform: isExiting ? 'translateY(-20px)' : 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease'
            }}
          >
            <span className="block w-2.5 h-2.5 bg-white rounded-full mr-2.5"></span>
            {words[index]}
          </p>
          <svg
            className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none"
            style={{
              overflow: 'visible'
            }}
          >
            <path d={pathD} fill="#000000" />
          </svg>
        </>
      )}
    </div>
  );
}
