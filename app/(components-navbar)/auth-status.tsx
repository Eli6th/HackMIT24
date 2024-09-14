import { createServerSupabaseClient } from "@/lib/server-utils";
import { getUserProfile } from "@/lib/utils";
import LoginButton from "./login-button";
import UserNav from "./user-nav";

export default async function AuthStatus() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <LoginButton />;
  }

  const { profile, error } = await getUserProfile(supabase, user);

  if (error) {
    return;
  }

  return <UserNav profile={profile} />;
}
