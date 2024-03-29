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
import { useExitModal } from "@/store/use-exit-modal";

export function ExitModal() {
  const router = useRouter();
  const { isOpen, close } = useExitModal();
  const [isClient, setIsClient] = useState(false);

  // Avoid potential hydration error
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/mascot_sad.svg"
              width={80}
              height={80}
              alt="Sad mascot"
            />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            Wait, don&apos;t go!
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            You have unsaved progress that will be lost.
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            {/* Keep learning */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={close}
            >
              Keep learning
            </Button>

            {/* End session */}
            <Button
              variant="dangerOutline"
              size="lg"
              className="w-full"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
