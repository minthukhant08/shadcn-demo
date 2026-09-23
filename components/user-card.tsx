import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

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
    return <Card>
        <CardHeader>
            <Avatar>
                <AvatarImage src={user.img} className={user.active ? "" : "grayscale"} />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className={user.active ? "bg-green-800" : "bg-gray-600"} />
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardFooter>
            <p>ID : {user.id}</p>
        </CardFooter>
    </Card>

}