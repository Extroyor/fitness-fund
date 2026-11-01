import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/sign-out-button";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Welcome />
      </Suspense>
      <SignOutButton />
    </>
  );
}

async function Welcome() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <h1>Fitness Fund - Welcome {session.user.name}</h1>;
}
