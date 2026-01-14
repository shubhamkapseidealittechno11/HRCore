
"use client"

import { useState } from "react"
import { useJobs } from "@/hooks/use-jobs"
import { JobTable } from "@/components/jobs/job-table"
import { columns } from "@/components/jobs/columns"
import { AddJobDialog } from "@/components/jobs/add-job-dialog"

export default function JobSchedulePage() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  
  const { data, isLoading, isError } = useJobs(page, pageSize)
console.log("data",data)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="flex h-full flex-col space-y-6 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Job Schedule</h2>
          <p className="text-muted-foreground">
            Manage your job postings and schedule.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AddJobDialog />
        </div>
      </div>
      
      <div className="flex-1">
        {isError ? (
          <div className="p-4 text-red-500 border rounded-md bg-red-50 dark:bg-red-900/10">
            Failed to load jobs. Please try again later.
          </div>
        ) : (
          <JobTable
            columns={columns}
            data={data?.data || []}
            pageCount={data?.pagination?.totalPages || 0}
            pageIndex={page}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}
