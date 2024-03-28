import Image from "next/image";
import { X, InfinityIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export function Header({ hearts, percentage, hasActiveSubscription }: Props) {
  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]">
      <X
        className="cursor-pointer text-slate-500 transition hover:opacity-75"
        onClick={() => {}}
      />

      <Progress value={percentage} />

      {/* Hearts */}
      <div className="flex items-center font-bold text-rose-500">
        <Image
          src="/heart.svg"
          width={28}
          height={28}
          alt="Heart"
          className="mr-2"
        />

        {hasActiveSubscription ? (
          <InfinityIcon className="size-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
}