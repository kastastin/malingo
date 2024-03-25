import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  active?: boolean;
  disabled?: boolean;
  onClick: (id: number) => void;
};

export function Card({
  id,
  title,
  imageSrc,
  active,
  disabled,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2",
        disabled && "pointer-events-none opacity-50",
      )}
      onClick={() => onClick(id)}
    >
      <div className="flex min-h-[24px] w-full items-center justify-end">
        {active && (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
            <Check className="size-4 stroke-[4] text-white" />
          </div>
        )}
      </div>

      <Image
        src={imageSrc}
        alt={title}
        width={93.33}
        height={70}
        className="rounded-lg border object-cover drop-shadow-md"
      />

      <p className="mt-3 text-center font-bold text-neutral-700">{title}</p>
    </div>
  );
}
