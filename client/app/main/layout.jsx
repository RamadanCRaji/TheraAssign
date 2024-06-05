import SideMenu from "@/app/components/ui/SideMenu";
import { Toaster } from "@/app/components/ui/Toaster";

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
