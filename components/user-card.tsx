import { useUserStore } from "@/store/user-list-store";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Delete, Pencil, Trash, X } from "lucide-react";
import { useGlobalDialogStore } from "@/store/dialog-store";

export type User = {
    id: string,
    name: string,
    email: string,
    img: string,
    active?: boolean
}

type UserProps = {
    user: User
}
export default function UserCard({ user }: UserProps) {
    const { toggleStatus, deleteUser, selectUser } = useUserStore()
    const { setOpen } = useGlobalDialogStore()

    const handleEdit = () => {
        selectUser(user)
        setOpen(true)
    }
    return <Card>
        <CardHeader>
            <Avatar>
                <AvatarImage src={user.img} className={user.active ? "" : "grayscale"} />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className={user.active ? "bg-green-800" : "bg-gray-600"} />
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <CardAction>
                <X size={20} className="text-red-300 cursor-pointer"
                    onClick={() => deleteUser(user.id)}
                />
                <Pencil size={20} className=" cursor-pointer" onClick={handleEdit} />
            </CardAction>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <p>ID : {user.id}</p>
            <div className="flex items-center space-x-2">
                <Switch id="active" checked={user.active ?? false} onCheckedChange={() => toggleStatus(user.id)}/>
                <Label htmlFor="active">Active</Label>
            </div>
        </CardFooter>
    </Card>

}