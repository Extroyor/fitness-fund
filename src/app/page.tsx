import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/sign-out-button";



export default async function Home() {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      redirect("/sign-in");
    } 
  
  return (
    <>
    <h1>Fitness Fund - Welcome {session.user.name}</h1>
    <SignOutButton />
    </>
  );
}
