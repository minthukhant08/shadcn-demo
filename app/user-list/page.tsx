'use client'
import { Button } from "@/components/ui/button";
import UserCard, { User } from "@/components/user-card";
import { UserFormDailog } from "@/components/user-form-dialog";
import { useGlobalDialogStore } from "@/store/dialog-store";
import { useUserStore } from "@/store/user-list-store";
import { useState } from "react";
import { toast } from "sonner";



export default function UserList() {
    const { setOpen } = useGlobalDialogStore()
    const { users } = useUserStore()
    return <div>
        <div className="w-full flex justify-end p-2 border-b border-white shadow-[0_4px_8px_-2px_rgba(255,255,255,0.35)]">
            <Button onClick={() => {setOpen(true)}} >Create user</Button>
            <UserFormDailog />
        </div>
        
        <div className="grid grid-cols-6 gap-5 p-4">
            {users.map((u) => <UserCard key={u.id} user={u} />)}
        </div>
    </div>
}