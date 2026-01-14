
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Job } from "@/types/job"
import { MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQueryClient } from "@tanstack/react-query"
import JobScheduleApi from "@/app/api/job-scheduleApi"
import { toast } from "sonner"
import { useState } from "react"

// Create a component for the Action Cell to use hooks
const ActionCell = ({ job }: { job: Job }) => {
  const queryClient = useQueryClient();
  const { deleteJob } = JobScheduleApi();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteJob(job.id);
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    } catch (error) {
      toast.error("Failed to delete job");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(job.id)}
        >
          Copy Job ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10 cursor-pointer"
        >
          <Trash className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Job"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => <span className="font-medium">{row.getValue("jobTitle")}</span>,
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type",
    cell: ({ row }) => {
      const type = row.getValue("employmentType") as string;
      return (
        <span className="capitalize">
          {type.replace(/_/g, " ")}
        </span>
      )
    }
  },
  {
    accessorKey: "jobLocation",
    header: "Location",
  },
  {
    accessorKey: "workMode",
    header: "Work Mode",
    cell: ({ row }) => <span className="capitalize">{row.getValue("workMode")}</span>
  },
  {
    accessorKey: "experienceRequired",
    header: "Experience",
    cell: ({ row }) => <span className="capitalize">{row.getValue("experienceRequired")}</span>
  },
  {
    accessorKey: "vacancies",
    header: "Vacancies",
    cell: ({ row }) => <div className="font-medium">{row.getValue("vacancies")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell job={row.original} />
  },
]
