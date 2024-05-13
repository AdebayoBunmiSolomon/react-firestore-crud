import { z as zod } from "zod";

export const addEmployeeValSchema = zod.object({
  firstName: zod.string().min(1, { message: "first name is required" }),
  lastName: zod.string().min(1, { message: "last name is required" }),
  email: zod
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email address" }),
  salary: zod
    .string()
    .min(1, { message: "salary is required" })
    .regex(/^\d+$/, { message: "salary mist be a number" }),
  date: zod.string().min(1, { message: "date is not selected" }),
  imageName: zod.string().min(1, { message: "image is not selected" }),
});
