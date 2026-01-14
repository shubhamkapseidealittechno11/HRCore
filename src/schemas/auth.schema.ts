import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  company_name: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile_number: z.string().min(10, { message: "Mobile number must be at least 10 digits" }).max(15, { message: "Mobile number must not exceed 15 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirm_password: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
  // profile_photo: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
  // role: z.enum(["admin", "user"], { message: "Role must be either admin or user" }),
  status: z.enum(["active", "inactive"], { message: "Status must be either active or inactive" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
