
import LogoutButton from "@/template/auth/logout-button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./ui/sidebar";
import { Home, LayoutGrid, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react"
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


type MenuItem = {
    label: string,
    url: string
    icon: LucideIcon,
    roles: Role[]
}

const Menuitems: MenuItem[] = [
    {
        label: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
        roles: ["Admin"]
    },
    {
        label: "Students",
        url: "/students",
        icon: User,
        roles: ["Admin", "Student"]
    },
    {
        label: "Users",
        url: "/user-list",
        icon: Users,
        roles: ["Admin", "Student"]
    },
]
const MenuButton = ({ item, role }: { item: MenuItem, role: Role }) => {
    if (item.roles.includes(role)) {
        const Icon = item.icon

        return <SidebarMenuItem >
            <Link href={item.url}>
                <SidebarMenuButton><Icon />{item.label}</SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    } else {
        return null
    }

}
export default async function AppSideBar() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }
    const role = session?.user.role
    return <Sidebar variant="sidebar">
        <SidebarHeader>
            Header
        </SidebarHeader>
        <SidebarContent>

            <SidebarMenu>
                {
                    Menuitems.map((item) => <MenuButton role={role} key={item.url} item={item} />)
                }
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <LogoutButton />
        </SidebarFooter>
    </Sidebar>
}