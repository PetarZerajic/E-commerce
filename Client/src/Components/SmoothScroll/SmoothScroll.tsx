import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import ResizeObserver from "resize-observer-polyfill";
import "./smoothScroll.scss";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState<number>(
    window.innerHeight
  );

  const [{ y }] = useSpring(() => ({
    y: 0,
    config: {
      mass: 1,
      tension: 200,
      friction: 50,
      precision: 0.00001,
      velocity: 0,
      clamp: true,
    },
  }));

  const getCurrentHeight = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      const crx = entry.contentRect;
      setCurrentHeight(crx.height);
    }
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const ro = new ResizeObserver((entries) => getCurrentHeight(entries));
    ro.observe(viewport);
    return () => {
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      y.start(-window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  return (
    <>
      <animated.div
        style={{
          transform: y.to((y) => `translate3d(0,${y}px,0)`),
        }}
        ref={viewportRef}
        className="scroll-container"
      >
        {children}
      </animated.div>
      <div style={{ height: currentHeight }} />
    </>
  );
};
