import { Chip } from "@heroui/react";

interface LineChipProps {
  line: string;
  className?: string;
  size: "sm" | "md" | "lg";
}

export function LineChip({ line, className = "", size = "lg" }: LineChipProps) {
  const getLineColor = (line: string) => {
    const lineColors: { [key: string]: string } = {
      RD: "bg-[#BF0D3E]",
      BL: "bg-[#009CDE]",
      OR: "bg-[#ED8B00]",
      GR: "bg-[#00B140]",
      YL: "bg-[#FFD100]",
      SV: "bg-[#919D9D]",
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
