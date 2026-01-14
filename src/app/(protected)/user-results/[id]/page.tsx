"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DetailsService from "@/app/api/detailsApi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Briefcase, CheckCircle2, XCircle, AlertCircle, Laptop, ShieldCheck, UserCircle, Target, Flame } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface UserResultDetail {
  _id: string;
  fullName: string;
  appliedRole: string;
  interviewDate: string;
  interviewDuration: string;
  previousRejections?: number;
  experienceLevel?: string;
  currentRole?: string;
  company?: string;
  skills?: string; // String with | pipe separators
  decision: string;
  shortSummary?: string;
  detailedSummary?: string;
  mode?: string;
  interviewer?: string;
  reviewDate?: string;
  age?: number;
  status?: string;
  currentCTC?: string;
  expectedCTC?: string;
  followUpNotes?: string;
  scoreTech: number;
  scoreProblemSolving: number;
  scoreCommunication: number;
  scoreSystemDesign?: number;
  scoreCultureFit?: number;
  scoreRedFlags?: number;
  strengths?: string | string[]; // Can be string with ; or actual array
  weaknesses?: string | string[]; // Can be string with ; or actual array
  recommendations?: string;
  createdAt: string | null;
  updatedAt?: string;
}

export default function UserResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { resultDetail } = DetailsService()
  
  const [data, setData] = useState<UserResultDetail | null>(null)
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
        const result = await resultDetail(params.id)
        
        // Handle different response formats (wrapped in data or direct object)
        const detailData = result?.data || result;
        
        if (detailData && (detailData._id || detailData.id)) {
          setData(detailData)
        } else {
          setError(result?.message || "Failed to load user result details")
        }
      } catch (err) {
        console.error("Error fetching user result detail:", err)
        setError("An error occurred while fetching the details")
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [params?.id])

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "YES":
        return <CheckCircle2 className="h-5 w-5 text-primary" />
      case "NO":
        return <XCircle className="h-5 w-5 text-primary" />
      case "MAYBE":
        return <AlertCircle className="h-5 w-5 text-primary" />
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getDecisionBadge = (decision: string) => {
    return (
      <Badge 
        variant="secondary" 
        className="text-lg px-6 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 cursor-default shadow-none pointer-events-none"
      >
        {decision || "Pending"}
      </Badge>
    )
  }

  const parseList = (input?: string | string[], delimiter = ';') => {
    if (!input) return []
    if (Array.isArray(input)) return input
    return input.split(delimiter).map(item => item.trim()).filter(Boolean)
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
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex h-full flex-col space-y-6 p-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/user-results")}
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">{error || "Failed to load details"}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const strengthsList = parseList(data.strengths)
  const weaknessesList = parseList(data.weaknesses)
  const skillsList = parseList(data.skills, '|')

  return (
    <div className="flex h-full flex-col space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/user-results")}
            className="h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {data?.fullName}
            </h2>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> {data?.appliedRole} • {data?.status}
            </p>
          </div>
        </div>
        {getDecisionBadge(data?.decision)}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Candidate Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Experience level</p>
              <p className="text-sm font-semibold">{data.experienceLevel || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Current Role</p>
              <p className="text-sm font-semibold">{data.currentRole || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Interviewer</p>
              <p className="text-sm font-semibold">{data.interviewer || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Interview Mode</p>
              <p className="text-sm font-semibold">{data.mode || "N/A"}</p>
            </div>
            <div className="space-y-1 pt-2 border-t">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {skillsList.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary/80">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Assessment */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Interview Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-base font-semibold text-primary">{data.shortSummary}</p>
              <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4 py-1">
                "{data.detailedSummary}"
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Interview Date
                </p>
                <p className="text-sm font-medium">
                   {data.interviewDate !== "Not discussed" 
                    ? data.interviewDate 
                    : (data.createdAt ? new Date(data.createdAt).toLocaleDateString() : (data.reviewDate ? new Date(data.reviewDate).toLocaleDateString() : "N/A"))}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Duration
                </p>
                <p className="text-sm font-medium">{data.interviewDuration}</p>
              </div>
            </div>
            {data.followUpNotes && (
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/20">
                <p className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-tighter mb-1">Follow up notes</p>
                <p className="text-sm text-orange-700 dark:text-orange-300">{data.followUpNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Scores Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance Matrix
          </CardTitle>
          <CardDescription>Comprehensive tactical and core behavioral scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Technical Skills", score: data.scoreTech, color: "blue", icon: Laptop },
              { label: "Communication", score: data.scoreCommunication, color: "purple", icon: UserCircle },
              { label: "Problem Solving", score: data.scoreProblemSolving, color: "green", icon: Target },
              { label: "System Design", score: data.scoreSystemDesign, color: "indigo", icon: Briefcase },
              { label: "Culture Fit", score: data.scoreCultureFit, color: "pink", icon: CheckCircle2 },
              { label: "Red Flags", score: data.scoreRedFlags, color: "red", icon: Flame, reverse: true },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`h-4 w-4 text-${item.color}-500`} />
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  </div>
                  <p className={`text-xl font-bold text-${item.color}-600`}>{item.score ?? "N/A"}</p>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${item.color}-500 transition-all`}
                    style={{ 
                      width: `${(item.score ?? 0) * 10}%`,
                      opacity: item.reverse ? (item.score ? 1 : 0.2) : 1
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Threats list */}
      <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-green-100 bg-green-50/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-green-700">
                <ShieldCheck className="h-5 w-5" />
                Key Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {strengthsList.length > 0 ? strengthsList.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600 shrink-0" />
                    {str}
                  </li>
                )) : <li className="text-sm text-muted-foreground">No strengths recorded.</li>}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-orange-50/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-orange-700">
                <AlertCircle className="h-5 w-5" />
                Areas for Improvement / Risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {weaknessesList.length > 0 ? weaknessesList.map((weak, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600 shrink-0" />
                    {weak}
                  </li>
                )) : <li className="text-sm text-muted-foreground">No risks recorded.</li>}
              </ul>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
