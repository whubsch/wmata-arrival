import { Chip } from "@heroui/react";

interface StatusChipProps {
  minutes: string;
  className?: string;
}

export function StatusChip({ minutes, className = "" }: StatusChipProps) {
  const displayMinutes = minutes === "0" ? "ARR" : minutes;
  const isArriving = displayMinutes === "ARR" || displayMinutes === "BRD";

  return isArriving ? (
    <Chip color="warning" className={className}>
      {displayMinutes}
    </Chip>
  ) : (
    <Chip color="default" className={className}>
      {minutes} min
    </Chip>
  );
}
