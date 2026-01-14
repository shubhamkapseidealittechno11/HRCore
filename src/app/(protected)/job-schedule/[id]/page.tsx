"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DetailsService from "@/app/api/detailsApi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Briefcase, Users, Clock, Building2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface JobDetail {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  employmentType: string;
  experienceRequired: string;
  jobLocation: string;
  workMode: string;
  vacancies: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  totalCandidates: number;
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { jobDetail } = DetailsService()
  
  const [data, setData] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      if (!params?.id) {
        setError("Invalid ID")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const result = await jobDetail(params.id)
        
        const detailData = result?.data || result;
        
        if (detailData && (detailData._id || detailData.id)) {
          setData(detailData)
        } else {
          setError(result?.message || "Failed to load job details")
        }
      } catch (err) {
        console.error("Error fetching job detail:", err)
        setError("An error occurred while fetching the details")
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [params?.id])

  const formatEmploymentType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatWorkMode = (mode: string) => {
    return mode.charAt(0).toUpperCase() + mode.slice(1)
  }

  if (loading) {
    return (
      <div className="flex h-full flex-col space-y-6 p-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[200px] col-span-2" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex h-full flex-col space-y-6 p-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/job-schedule")}
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">{error || "Failed to load details"}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/job-schedule")}
            className="h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {data.jobTitle}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/20">
                {formatWorkMode(data.workMode)}
              </Badge>
              <Badge variant="outline">
                {formatEmploymentType(data.employmentType)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Posted on {new Date(data.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {data.jobDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </p>
                <p className="font-medium">{data.jobLocation}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Experience Required
                </p>
                <p className="font-medium">{data.experienceRequired}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> Vacancies
                </p>
                <p className="font-medium">{data.vacancies} Position{data.vacancies > 1 ? 's' : ''}</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Total Candidates
                  </p>
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    {data.totalCandidates}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
