import SideMenu from "@/components/ui/SideMenu";

export default function DashboardLayout({ children }) {
  return (
    <>
      <section className=" flex h-screen w-screen items-stretch  justify-start">
        <SideMenu />
        {children}
      </section>
    </>
  );
}
