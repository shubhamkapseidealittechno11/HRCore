import * as z from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export const candidateSchema = z.object({
  linkedinUrl: z.string().url({ message: "Please enter a valid LinkedIn URL" }),
  resume: z
    .any()
    .refine((files) => files?.length > 0, "Resume is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".pdf and .docx files are accepted."
    ),
})

export type CandidateFormValues = z.infer<typeof candidateSchema>
