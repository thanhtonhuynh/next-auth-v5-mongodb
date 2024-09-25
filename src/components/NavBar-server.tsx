import { signIn } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import UserButtonServer from "./UserButton-server";
import { getCurrentUser } from "@/lib/session";

export default async function NavBarServer() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Next-Auth v5 Tutorial
        </Link>

        {user ? <UserButtonServer user={user} /> : <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}
