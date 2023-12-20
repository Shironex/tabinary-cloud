import StorageSideBar from "@/components/layout/storage-side-bar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardStorageLayout({ children }: Props) {
  return (
    <main>
      {children}
    </main>
  );
}
