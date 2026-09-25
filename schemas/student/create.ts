import z from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  status: z.enum(['active' , 'inactive'])
});