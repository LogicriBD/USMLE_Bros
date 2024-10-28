import { validate } from "@/utils/Validate";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password Must be a minimum of 8 Characters")
    .max(255, "Password is too long"),
});

export type LoginBody = z.infer<typeof loginSchema>;
export const LoginValidator = validate<LoginBody>(loginSchema);
