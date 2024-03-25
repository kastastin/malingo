type Props = {
  children: React.ReactNode;
};

export function FeedWrapper({ children }: Props) {
  return <div className="relative top-0 flex-1 pb-10">{children}</div>;
}
