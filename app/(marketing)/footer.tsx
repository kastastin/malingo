import { Button } from "@/components/ui/button";
import Image from "next/image";

const languages = [
  {
    name: "Croatian",
    flagSrc: "/flags/hr.svg",
  },
  {
    name: "Spanish",
    flagSrc: "/flags/es.svg",
  },
  {
    name: "French",
    flagSrc: "/flags/fr.svg",
  },
  {
    name: "Italian",
    flagSrc: "/flags/it.svg",
  },
  {
    name: "Japanese",
    flagSrc: "/flags/jp.svg",
  },
];

export function Footer() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        {languages.map((language, index) => (
          <Button key={index} variant="ghost" size="lg" className="w-full">
            <Image
              src={language.flagSrc}
              alt={`${language.name} flag`}
              width={40}
              height={32}
              className="mr-4 rounded-md"
            />
            {language.name}
          </Button>
        ))}
      </div>
    </footer>
  );
}
