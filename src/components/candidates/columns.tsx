
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Candidate } from "@/hooks/use-candidates"

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.getValue("phone") || "N/A"}</span>
  },
  {
    accessorKey: "totalExperienceYears",
    header: "Experience",
    cell: ({ row }) => {
        const years = row.getValue("totalExperienceYears");
        return <span>{years ? `${years} Years` : "N/A"}</span>
    }
  },
  // Add actions if needed later
]
