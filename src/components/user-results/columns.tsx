"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface InterviewResult {
  _id: string;
  fullName: string;
  appliedRole: string;
  interviewDate: string;
  interviewDuration: string;
  decision: string;
  scoreTech: number;
  scoreCommunication: number;
  scoreProblemSolving: number;
  createdAt: string | null;
}

export const columns: ColumnDef<InterviewResult>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "appliedRole",
    header: "Role",
  },
  {
    accessorKey: "interviewDate",
    header: "Date",
     cell: ({ row }) => {
      const date = row.getValue("interviewDate") as string;
      const displayDate = date !== "Not discussed" ? date : row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : "N/A";
      return <span>{displayDate}</span>
    }
  },
  {
    accessorKey: "decision",
    header: "Decision",
    cell: ({ row }) => {
      const decision = row.getValue("decision") as string;
      let colorClass = "bg-gray-100 text-gray-800";
      
      if (decision === "YES") colorClass = "bg-green-100 text-green-800";
      else if (decision === "NO") colorClass = "bg-red-100 text-red-800";
      else if (decision === "MAYBE") colorClass = "bg-yellow-100 text-yellow-800";

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
          {decision || "Pending"}
        </span>
      )
    }
  },
   {
    accessorKey: "scoreTech",
    header: "Tech Score",
    cell: ({ row }) => {
        const score = row.getValue("scoreTech") as number | null;
        return <span>{score !== null && score !== undefined ? score : "N/A"}</span>
    }
  }
]
