type Props = {
  children: React.ReactNode;
};

export function StickyWrapper({ children }: Props) {
  return (
    // Check lated: add 'self-end'
    <div className="sticky bottom-6 hidden w-[368px] lg:block"> 
      <div className="min-h-[calc(100vh - 48px)] sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
}
