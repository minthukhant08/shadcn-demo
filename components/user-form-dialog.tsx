import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldError, FieldLabel } from "./ui/field"
import { useForm } from "react-hook-form"
import z from "zod"
import { userRegisterSchema } from "@/schemas/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { User } from "./user-card"
import { v4 as uuidv4 } from 'uuid';

type UserFormDailogProp = {
  handleCreate: (user: User) => void
}
export function UserFormDailog( { handleCreate } : UserFormDailogProp) {
  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),

  })

   function onSubmit(values: z.infer < typeof userRegisterSchema > ) {
    try {
      console.log(values);
      handleCreate({
        id: uuidv4(),
        email: values.email,
        img: values.img,
        name: values.name,
      })
      form.reset()
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Create</Button>}  />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              placeholder="Enter name"

              {...form.register("name")}
            />

            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="Enter email"

              {...form.register("email")}
            />

            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="img">Image</FieldLabel>
            <Input
              id="img"
              placeholder="Enter Image"

              {...form.register("img")}
            />

            <FieldError>{form.formState.errors.img?.message}</FieldError>
          </Field>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
