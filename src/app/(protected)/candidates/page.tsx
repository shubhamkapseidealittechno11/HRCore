
"use client"

import { useState } from "react"
import { useCandidates } from "@/hooks/use-candidates"
import { CandidateTable } from "@/components/candidates/candidate-table"
import { columns } from "@/components/candidates/columns"

export default function CandidatesPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  
  const { data, isLoading, isError } = useCandidates(page, pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="flex h-full flex-col space-y-6 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Candidates</h2>
          <p className="text-muted-foreground">
            Manage your candidates and applications.
          </p>
        </div>
      </div>
      
      <div className="flex-1">
        {isError ? (
          <div className="p-4 text-red-500 border rounded-md bg-red-50 dark:bg-red-900/10">
            Failed to load candidates. Please try again later.
          </div>
        ) : (
          <CandidateTable
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
