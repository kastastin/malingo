"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export function HeartsModal() {
  const router = useRouter();
  const { isOpen, close } = useHeartsModal();
  const [isClient, setIsClient] = useState(false);

  // Avoid potential hydration error
  useEffect(() => setIsClient(true), []);

  function onClick() {
    close();
    router.push("/store");
  }

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/mascot_bad.svg"
              width={80}
              height={80}
              alt="Sad mascot"
            />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            You ran out of hearts!
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Get Pro to unlock unlimited hearts or purchase them in the store.
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            {/* Get unlimited hearts */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>

            {/* No thanks */}
            <Button
              variant="primaryOutline"
              size="lg"
              className="w-full"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
