
import { z } from "zod";

export const jobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  employmentType: z.enum(['full_time', 'part_time', 'contract', 'internship', 'temporary'], {
    required_error: "Please select an employment type",
  }),
  experienceRequired: z.string().min(1, "Experience required is required"),
  jobLocation: z.string().min(1, "Job location is required"),
  workMode: z.enum(['remote', 'hybrid', 'onsite'], {
    required_error: "Please select a work mode",
  }),
  vacancies: z.coerce.number().min(1, "Vacancies must be at least 1"),
});

export type JobFormValues = z.infer<typeof jobSchema>;
