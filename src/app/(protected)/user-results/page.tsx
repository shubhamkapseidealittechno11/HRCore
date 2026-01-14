"use client"

import { useEffect, useState } from "react"
import dashboard from "@/app/api/dashboardApi"
import { UserResultsTable } from "@/components/user-results/user-results-table"
import { columns, InterviewResult } from "@/components/user-results/columns"

export default function UserResultsPage() {
  const [data, setData] = useState<InterviewResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await dashboard()
        // Ensure result is an array
        if (Array.isArray(result)) {
            setData(result)
        } else {
            console.warn("API did not return an array:", result)
            setData([])
        }
      } catch (err) {
        console.error("Error fetching user results:", err)
        setError("Failed to load user results.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-full flex-col space-y-6 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">User Results</h2>
          <p className="text-muted-foreground">
            View detailed interview performance results and decisions.
          </p>
        </div>
      </div>
      
      <div className="flex-1">
        {error ? (
          <div className="p-4 text-red-500 border rounded-md bg-red-50 dark:bg-red-900/10">
            {error}
          </div>
        ) : (
          <UserResultsTable
            columns={columns}
            data={data}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  )
}
