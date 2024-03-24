"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export function SidebarItem({ label, iconSrc, href }: Props) {
  const pathname = usePathname();
  const isPathActive = pathname === href;

  return (
    <Button
      variant={isPathActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          width={32}
          height={32}
          className="mr-5"
        />
        
        {label}
      </Link>
    </Button>
  );
}
