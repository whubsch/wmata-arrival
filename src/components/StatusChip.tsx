import { Chip } from "@heroui/react";

interface StatusChipProps {
  minutes: string;
  className?: string;
}

export function StatusChip({ minutes, className = "" }: StatusChipProps) {
  const isArriving = minutes === "ARR" || minutes === "BRD";

  return isArriving ? (
    <Chip color="warning" className={className}>
      {minutes}
    </Chip>
  ) : (
    <Chip color="default" className={className}>
      {minutes} min
    </Chip>
  );
}
