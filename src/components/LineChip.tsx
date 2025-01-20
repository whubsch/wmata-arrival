import { Chip } from "@heroui/react";

interface LineChipProps {
  line: string;
  className?: string;
  size: "sm" | "md" | "lg";
}

export function LineChip({ line, className = "", size = "lg" }: LineChipProps) {
  const getLineColor = (line: string) => {
    const lineColors: { [key: string]: string } = {
      RD: "bg-red-500",
      BL: "bg-blue-500",
      OR: "bg-orange-500",
      GR: "bg-green-500",
      YL: "bg-yellow-500",
      SV: "bg-gray-400",
    };
    return lineColors[line] || "bg-gray-200";
  };

  return (
    <Chip
      className={`${getLineColor(line)} ${className}`}
      size={size}
      radius="full"
    >
      <span
        className={`${["YL", "SV"].includes(line) ? "text-black" : "text-white"} font-bold`}
      >
        {line}
      </span>
    </Chip>
  );
}
