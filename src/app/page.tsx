import SignOutButton from "@/components/sign-out-button";
import { Suspense } from "react";

import { getSession } from "@/lib/session";

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
  const session = await getSession();

  return <h1>Fitness Fund - Welcome {session.user.name}</h1>;
}
