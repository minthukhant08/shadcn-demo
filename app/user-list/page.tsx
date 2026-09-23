'use client'
import { Button } from "@/components/ui/button";
import UserCard, { User } from "@/components/user-card";
import { UserFormDailog } from "@/components/user-form-dialog";
import { useState } from "react";
import { toast } from "sonner";



export default function UserList() {
    const default_users: User[] = [
        {
            id: "1",
            name: "John Smith",
            email: "john.smith@example.com",
            img: "https://i.pravatar.cc/150?img=1",
            active: true
        },
        {
            id: "2",
            name: "Emily Johnson",
            email: "emily.johnson@example.com",
            img: "https://i.pravatar.cc/150?img=2",
        },
        {
            id: "3",
            name: "Michael Brown",
            email: "michael.brown@example.com",
            img: "https://i.pravatar.cc/150?img=3",
        },
        {
            id: "4",
            name: "Sophia Williams",
            email: "sophia.williams@example.com",
            img: "https://i.pravatar.cc/150?img=4",
        },
        {
            id: "5",
            name: "Daniel Davis",
            email: "daniel.davis@example.com",
            img: "https://i.pravatar.cc/150?img=5",
        },
        {
            id: "6",
            name: "Olivia Wilson",
            email: "olivia.wilson@example.com",
            img: "https://i.pravatar.cc/150?img=6",
        },
        {
            id: "7",
            name: "James Martinez",
            email: "james.martinez@example.com",
            img: "https://i.pravatar.cc/150?img=7",
        },
        {
            id: "8",
            name: "Ava Anderson",
            email: "ava.anderson@example.com",
            img: "https://i.pravatar.cc/150?img=8",
        },
        {
            id: "9",
            name: "William Taylor",
            email: "william.taylor@example.com",
            img: "https://i.pravatar.cc/150?img=9",
        },
        {
            id: "10",
            name: "Emma Thomas",
            email: "emma.thomas@example.com",
            img: "https://i.pravatar.cc/150?img=10",
        },
    ];

    const [users, setUsers] = useState<User[]>(default_users)

    const addNewUser = (user: User) => {
        setUsers((prev)=> [...prev, user])
    }

    return <div>
        <div className="w-full flex justify-end p-2 border-b border-white shadow-[0_4px_8px_-2px_rgba(255,255,255,0.35)]">
            <UserFormDailog handleCreate={addNewUser} />
        </div>
        <Button onClick={() => toast("hello")} >Toast</Button>
        <div className="grid grid-cols-6 gap-5 p-4">

            {users.map((u) => <UserCard key={u.id} user={u} />)}
        </div>
    </div>
}