import { z } from 'zod'

export const userRegisterSchema = z.object({
  name: z.string().min(1, "enter at least one character"),
  email: z.email(),
  img: z.string().min(1, "enter image url")
});
