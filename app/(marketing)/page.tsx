import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[998px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      {/* Hero image */}
      <div className="relative mb-8 size-[240px] lg:mb-0 lg:size-[424px]">
        <Image src="/hero.svg" fill alt="Hero" />
      </div>

      {/* Hero text */}
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Learn, practice, and master new languages with Malingo.
        </h1>

        {/* Auth */}
        <div>
          <ClerkLoading>
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button variant="secondary" size="lg" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button variant="primaryOutline" size="lg" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
