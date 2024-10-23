import { validate } from "@/utils/Validate";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type LoginBody = z.infer<typeof loginSchema>;
export const LoginValidator = validate<LoginBody>(loginSchema);
