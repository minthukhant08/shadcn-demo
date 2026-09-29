import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AppSideBar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function PrivateLayout({ children } : { children: ReactNode}){
    const session  = await getServerSession(authOptions)
    if (!session){
        redirect("/")
    }
    return <SidebarProvider>
        <AppSideBar/>
        <SidebarTrigger/>
        {children}
    </SidebarProvider>
}