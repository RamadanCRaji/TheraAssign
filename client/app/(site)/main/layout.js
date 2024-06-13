import SideMenu from "@/components/ui/SideMenu";
import AuthContext from "@/app/context/AuthContext";

export default function MainPageLayout({ children }) {
  return (
    <>
      <section className=" flex h-screen w-screen items-stretch  justify-start">
        <AuthContext>
          <SideMenu />
          {children}
        </AuthContext>
      </section>
    </>
  );
}
