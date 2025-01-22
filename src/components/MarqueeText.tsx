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
  return (
    <div className="overflow-x-hidden">
      <div className={`max-w-${maxWidth} whitespace-nowrap animate-marquee`}>
        <h1 className={`text-2xl font-bold ${className}`}>{text}</h1>
      </div>
    </div>
  );
};
