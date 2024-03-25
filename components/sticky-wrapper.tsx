type Props = {
  children: React.ReactNode;
};

export function StickyWrapper({ children }: Props) {
  return (
    <div className="self-endw-[368px] sticky bottom-6 hidden lg:block">
      <div className="sticky top-6 flex min-h-[calc(100vh-48px)] flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
}
