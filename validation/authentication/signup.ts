import { validate } from "@/utils/Validate";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password Must be a minimum of 8 Characters")
    .max(255, "Password is too long"),
  confirmPassword: z.string(),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export const RegisterValidator = validate<RegisterBody>(
  registerSchema,
  true,
  ["password", "confirmPassword"],
  {
    confirmPassword: "Passwords do not match",
  }
);
