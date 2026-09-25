'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function LoginForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),

    })
    async function onSubmit(values: z.infer<typeof authSchema>) {
        try {
            const result = await signIn('credentials',
                {
                    redirect: false,
                    email: values.email,
                    password: values.password
                })
            if (result?.status !== 200) {
                toast("username or password wrong")
            } else {
                router.push("/students")
            }
        } catch (error) {

        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    placeholder="Email address"

                    {...form.register("email")}
                />

                <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                    id="password"
                    placeholder="Password.."
                    type="password"
                    {...form.register("password")}
                />

                <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Button type="submit">
                {form.formState.isSubmitting ? <><Spinner /> Submitting</> : <>Submit</>}
            </Button>
        </form>
    )
}