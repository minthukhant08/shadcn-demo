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
import { userRegisterSchema } from "@/schemas/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { User } from "./user-card"
import { v4 as uuidv4 } from 'uuid';
import GlobalDialog from "./dialog"
import { useUserStore } from "@/store/user-list-store"
import { useGlobalDialogStore } from "@/store/dialog-store"
import { useEffect } from "react"


export function UserFormDailog() {
  const { createUser, selecteduser, updateUser } = useUserStore()
  const { setOpen } = useGlobalDialogStore()

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
  })

  useEffect(() => {
    if (selecteduser) {
      form.setValues({
        email: selecteduser.email,
        name: selecteduser.name,
        img: selecteduser.img
      })
    }
  }, [selecteduser])

  function onSubmit(values: z.infer<typeof userRegisterSchema>) {
    try {
      if (selecteduser) {
        updateUser({
          id: selecteduser.id,
          email: values.email,
          img: values.img,
          name: values.name,
          active: selecteduser.active
        })
      } else {
        createUser({
          id: uuidv4(),
          email: values.email,
          img: values.img,
          name: values.name,
        })
      }
      form.reset()
      setOpen(false)
      toast.success("User Created");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <GlobalDialog title={selecteduser ? "Edit User" : "Create User"}>
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
    </GlobalDialog>
  )
}
