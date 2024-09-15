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
    // this is a protected route - only users who are signed in can view this route

    /*
      Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.
      Always use supabase.auth.getUser() to protect pages and user data.
      Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.
      It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.
    */

    redirect("/");
  }

  // const userEmail = user.email;


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
