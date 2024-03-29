import Image from "next/image";

type Props = {
  question: string;
};

export function QuestionBubble({ question }: Props) {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      {/* Mascot (desktop version) */}
      <Image
        src="/mascot.svg"
        width={60}
        height={60}
        alt="Maskot"
        className="hidden lg:block"
      />

      {/* Mascot (mobile version) */}
      <Image
        src="/mascot.svg"
        width={40}
        height={40}
        alt="Maskot"
        className="block lg:hidden"
      />

      {/* Question */}
      <div className="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
        {question}
        {/* Chevron */}
        <div className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent" />
      </div>
    </div>
  );
}
