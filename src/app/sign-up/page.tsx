"use client";
import { useState, SubmitEvent} from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>){

        e.preventDefault();

        const {error: signUpError} = await authClient.signUp.email({name, email, password});
        
        if (signUpError) {
            setError(signUpError.message ?? "An error occurred during sign up.");
            return;
        } 

        router.push("/");
        
    }


  return (
    <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
    </>
  );
}