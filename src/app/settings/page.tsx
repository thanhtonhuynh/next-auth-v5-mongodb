import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import SettingsPage from "./SettingsPage";

export default async function Page() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }

  return <SettingsPage user={user} />;
}
