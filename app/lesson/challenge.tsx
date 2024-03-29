import { cn } from "@/lib/utils";
import { challenges, challengeOptions } from "@/db/schema";

import { Card } from "./card";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  selectedOption?: number;
  type: (typeof challenges.$inferSelect)["type"];
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  onSelect: (id: number) => void;
};

export function Challenge({
  options,
  selectedOption,
  type,
  status,
  disabled,
  onSelect,
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
      )}
    >
      {options.map((option, index) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          shortcut={`${index + 1}`}
          selected={selectedOption === option.id}
          status={status}
          type={type}
          imageSrc={option.imageSrc}
          audioSrc={option.audioSrc}
          disabled={disabled}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
}
