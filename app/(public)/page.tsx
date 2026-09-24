'use client'
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";


export default function Home() {
  const { data } = useSession()

  return (
    <div>
      <span>User: {JSON.stringify(data?.user)} </span>
      <Button onClick={() => signIn('discord', { redirect: false })} >Login</Button>
    </div>
  );
}
