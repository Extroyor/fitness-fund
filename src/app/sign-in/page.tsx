"use client";
import { useState, SubmitEvent} from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
        
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>){

        e.preventDefault();

        const {error: signInError} = await authClient.signIn.email({email, password});
        
        if (signInError) {
            setError(signInError.message ?? "An error occurred during sign in.");
            return;
        } 

        router.push("/");
        
    }


  return (
    <>
    <h1>Sign In</h1>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign In</button>
      {error && <p>{error}</p>}
    </form>
    </>
  );
}