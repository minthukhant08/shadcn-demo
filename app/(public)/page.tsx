'use client'
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";


export default function Home() {
  const { data } = useSession()
  const handleSignIn = () => {
    signIn('credentials',
      {
        redirect: false,
        email: "admin@mail.com",
        password: "password"
      }).then((response)=> {
        if (response?.status !==200){
          toast("username or password wrong")
        }
      })
  }
  return (
    <div>
      <span>User: {JSON.stringify(data?.user)} </span>
      <Button onClick={handleSignIn} >Login</Button>
    </div>
  );
}
