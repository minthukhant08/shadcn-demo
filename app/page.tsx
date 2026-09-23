import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div>
      <div>
        
      </div>
      <Button variant={"destructive"}>Hello</Button>
      <Button variant={"ghost"}>Hello</Button>
      <Button variant={"outline"}>Hello</Button>
      <Button variant={"secondary"}>Hello</Button>
      <Button variant={"link"}>Hello</Button>
      <Button variant={"default"}>Hello</Button>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
