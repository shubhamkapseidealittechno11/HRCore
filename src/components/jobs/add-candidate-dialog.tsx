"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { candidateSchema, CandidateFormValues } from "@/schemas/candidate.schema"
import JobScheduleApi from "@/app/api/job-scheduleApi"

interface AddCandidateDialogProps {
  jobId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCandidateDialog({ jobId, open, onOpenChange }: AddCandidateDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { createJobSchedule } = JobScheduleApi()

  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      linkedinUrl: "",
      resume: undefined,
    },
  })

  const onSubmit: SubmitHandler<CandidateFormValues> = async (values) => {
    try {
      setIsLoading(true)
      
      const formData = new FormData()
      formData.append("linkedinUrl", values.linkedinUrl)
      if (values.resume && values.resume[0]) {
        formData.append("resume", values.resume[0])
      }

      await createJobSchedule(jobId, formData)
      
      toast.success("Candidate added successfully")
      onOpenChange(false)
      form.reset()
    } catch (error: any) {
      toast.error(error.message || "Failed to add candidate")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Candidate</DialogTitle>
          <DialogDescription>
            Upload a resume and provide a LinkedIn URL to add a candidate to this job.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Resume (PDF, DOCX)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        {...fieldProps}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(event) => {
                          onChange(event.target.files)
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
                >
                  {isLoading ? "Adding..." : "Add Candidate"}
                </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
