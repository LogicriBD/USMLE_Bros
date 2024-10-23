import { validate } from "@/utils/Validate";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
  confirmPassword: z.string(),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export const RegisterValidator = validate<RegisterBody>(registerSchema, true, [
  "password",
  "confirmPassword",
]);
