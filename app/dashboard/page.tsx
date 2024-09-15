// import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import Agenda from "./Agenda";
import AuthStatus from "../(components-navbar)/auth-status";
import Navbar from "../(components-navbar)/navbar";


export default async function Dashboard() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <div className="flex h-16 items-center px-4">
        <Navbar className="mx-6 text-default" />
        <div className="ml-auto flex items-center space-x-4">
          <AuthStatus />
        </div>
      </div>

      <Agenda />
    </>
  );
}
