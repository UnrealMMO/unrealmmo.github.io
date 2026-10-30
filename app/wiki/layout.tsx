import { WikiNavigation } from "@/components/wiki-navigation";
export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WikiNavigation />
      {children}
    </>
  );
}
