"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export function PracticeModal() {
  const { isOpen, close } = usePracticeModal();
  const [isClient, setIsClient] = useState(false);

  // Avoid potential hydration error
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/heart.svg" width={100} height={100} alt="Heart" />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            Practice lesson
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Use this mode to regain hearts and improve your skills. You
            can&apos;t lose hearts here.
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            {/* No thanks */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
