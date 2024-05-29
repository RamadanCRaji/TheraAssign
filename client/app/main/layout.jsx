import SideMenu from "@/components/ui/SideMenu";
import { Toaster } from "@/components/ui/Toaster";

export default function DashboardLayout({ children }) {
  return (
    <>
      <section className=" flex h-screen w-screen items-stretch  justify-start">
        <SideMenu />
        {children}
      </section>
      <Toaster />
    </>
  );
}
