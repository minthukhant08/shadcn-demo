'use client'

import { createAction } from "@/template/students/actions"
import GlobalDialog from "@/components/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { userCreateSchema } from "@/schemas/student/create"
import { useGlobalDialogStore } from "@/store/dialog-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

export default function UserCreateForm() {
    const { setOpen } = useGlobalDialogStore()
    
    const form = useForm<z.infer<typeof userCreateSchema>>({
        resolver: zodResolver(userCreateSchema),
    })

    async function onSubmit(values: z.infer<typeof userCreateSchema>) {
        try {
            console.log(values);
            await createAction({
                address: values.address,
                email: values.email,
                name: values.name,
                phone: values.phone,
                status: values.status
            })
            setOpen(false)
            form.reset()
        } catch (error) {

        }
    }

    return <>
        <Button onClick={() => setOpen(true)} >Create</Button>
        <GlobalDialog title="Create Student">
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        placeholder="Name"

                        {...form.register("name")}
                    />

                    <FieldError>{form.formState.errors.name?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        placeholder="Email"

                        {...form.register("email")}
                    />

                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                        id="phone"
                        placeholder="Phone No"

                        {...form.register("phone")}
                    />

                    <FieldError>{form.formState.errors.phone?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input
                        id="address"
                        placeholder="Address"

                        {...form.register("address")}
                    />

                    <FieldError>{form.formState.errors.address?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <FieldError>{form.formState.errors.status?.message}</FieldError>
                </Field>
                <Button type="submit">
                    {
                        form.formState.isSubmitting ? <Spinner/> : "Submit"
                    }
                </Button>
            </form>
        </GlobalDialog>
    </>
}