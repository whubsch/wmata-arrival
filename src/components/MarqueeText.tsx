import { useRef, useState, useEffect } from "react";

interface MarqueeTextProps {
  text: string;
  maxWidth: number;
  className?: string;
}

export const MarqueeText = ({
  text,
  maxWidth,
  className = "",
}: MarqueeTextProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const isTextOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsOverflowing(isTextOverflowing);
    }
  }, [text]);

  return (
    <div className="overflow-x-hidden" style={{ maxWidth: `${maxWidth}rem` }}>
      <div
        ref={textRef}
        className={`
          whitespace-nowrap
          ${isOverflowing ? "animate-marquee" : ""}
        `}
      >
        <h1 className={`text-2xl font-bold ${className}`}>{text}</h1>
      </div>
    </div>
  );
};
