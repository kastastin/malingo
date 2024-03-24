import Link from "next/link";
import Image from "next/image";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "@/components/sidebar-item";

const sidebarItems = [
  { label: "Learn", href: "/learn", iconSrc: "/menu-items/learn.svg" },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    iconSrc: "/menu-items/leaderboard.svg",
  },
  { label: "Quests", href: "/quests", iconSrc: "/menu-items/quests.svg" },
  { label: "Shop", href: "/shop", iconSrc: "/menu-items/shop.svg" },
];

type Props = {
  className?: string;
};

export function Sidebar({ className }: Props) {
  return (
    <aside
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className,
      )}
    >
      {/* Logo */}
      <Link href="/learn">
        <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/mascot.svg" width={40} height={40} alt="Logo" />

          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            Malingo
          </h1>
        </div>
      </Link>

      {/* Sidebar items */}
      <div className="flex flex-1 flex-col gap-y-2">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}

        {/* Logout */}
        <div className="mt-auto p-4">
          <ClerkLoading>
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </ClerkLoading>

          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
      </div>
    </aside>
  );
}
