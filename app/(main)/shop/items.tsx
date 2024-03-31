"use client";

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";

import { Button } from "@/components/ui/button";

type Props = {
  points: number;
  hearts: number;
  hasActiveSubscription: boolean;
};

export function Items({ points, hearts, hasActiveSubscription }: Props) {
  const [pending, startTransition] = useTransition();

  function onRefillHearts() {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong"));
    });
  }

  function onUpgrade() {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) window.location.href = response.data;
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/heart.svg" width={60} height={60} alt="Heart" />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Refill hearts
          </p>
        </div>

        <Button
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
          onClick={onRefillHearts}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" width={20} height={20} alt="Points" />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>

      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" width={60} height={60} alt="Unlimited" />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Unlimited hearts
          </p>
        </div>

        <Button disabled={pending} onClick={onUpgrade}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
    </ul>
  );
}
