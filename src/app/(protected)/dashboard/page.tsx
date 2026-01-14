"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Target, TrendingUp, Clock, Award } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import dashboard from "@/app/api/dashboardApi";
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface InterviewResult {
  _id: string;
  fullName: string;
  appliedRole: string;
  interviewDate: string;
  interviewDuration: string;
  decision: string;
  scoreTech: number;
  scoreCommunication: number;
  scoreProblemSolving: number;
  scoreSystemDesign: number;
  scoreCultureFit: number;
  createdAt: string | null;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<InterviewResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dashboard();
        console.log("Dashboard data:", data);
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate analytics with optional chaining
  const analytics = useMemo(() => {
    const records = dashboardData || [];
    
    const totalCandidates = records.length;
    const recommended = records.filter(r => r?.decision === "YES" || r?.decision === "MAYBE").length; // Including MAYBE as recommended for now
    
    const scoresArray = records
      .map(r => ((r?.scoreTech || 0) + (r?.scoreCommunication || 0) + (r?.scoreProblemSolving || 0)) / 3)
      .filter((score): score is number => typeof score === 'number');
    
    const avgScore = scoresArray.length > 0
      ? (scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length).toFixed(1)
      : "0";

    // Parse duration strings like "Approximately 15 minutes"
    const durations = records
      .map(r => {
        const duration = r?.interviewDuration || "";
        const match = duration.match(/(\d+)/);
        return match ? parseInt(match[1]) : null;
      })
      .filter((d): d is number => d !== null);
    
    const avgDuration = durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

    return {
      totalCandidates,
      recommended,
      avgScore,
      avgDuration,
    };
  }, [dashboardData]);

  // Prepare interview trends data (by month)
  const trendsData = useMemo(() => {
    const records = dashboardData || [];
    const monthCounts: Record<string, { total: number; recommended: number }> = {};

    records.forEach(record => {
      const dateStr = record?.interviewDate !== "Not discussed" ? record?.interviewDate : record?.createdAt;
      if (!dateStr) return;

      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return;

      const monthKey = `${date.getMonth() + 1}/${date.getDate()}`;
      
      if (!monthCounts[monthKey]) {
        monthCounts[monthKey] = { total: 0, recommended: 0 };
      }
      
      monthCounts[monthKey].total += 1;
      if (record?.decision === "YES" || record?.decision === "MAYBE") {
        monthCounts[monthKey].recommended += 1;
      }
    });

    return Object.entries(monthCounts)
      .map(([date, counts]) => ({
        date,
        total: counts.total,
        recommended: counts.recommended,
      }))
      .sort((a, b) => {
        const [aMonth, aDay] = a.date.split('/').map(Number);
        const [bMonth, bDay] = b.date.split('/').map(Number);
        return aMonth !== bMonth ? aMonth - bMonth : aDay - bDay;
      });
  }, [dashboardData]);

  // Prepare score distribution data
  const scoreDistribution = useMemo(() => {
    const records = dashboardData || [];
    const distribution = {
      excellent: 0,  // 8-10
      good: 0,       // 6-7
      fair: 0,       // 4-5
      poor: 0,       // 0-3
    };

    records.forEach(record => {
      const avg = ((record?.scoreTech || 0) + (record?.scoreCommunication || 0) + (record?.scoreProblemSolving || 0)) / 3;
      
      if (avg >= 8) distribution.excellent += 1;
      else if (avg >= 6) distribution.good += 1;
      else if (avg >= 4) distribution.fair += 1;
      else distribution.poor += 1;
    });

    return [
      { name: "Excellent (8-10)", value: distribution.excellent, fill: "#4F46E5" },
      { name: "Good (6-7.9)", value: distribution.good, fill: "#F59E0B" },
      { name: "Fair (4-5.9)", value: distribution.fair, fill: "#F59E0B" },
      { name: "Poor (0-3.9)", value: distribution.poor, fill: "#EF4444" },
    ].filter(item => item.value > 0);
  }, [dashboardData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading dashboard: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Interview Analytics</h1>
        </div>
        <p className="text-muted-foreground">
          Comprehensive overview of candidate assessments and performance metrics
        </p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL CANDIDATES</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalCandidates}</div>
            <p className="text-xs text-green-600 mt-1">↑ +12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">RECOMMENDED</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.recommended}</div>
            <p className="text-xs text-green-600 mt-1">↑ +8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AVG SCORE</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.avgScore}</div>
            <p className="text-xs text-green-600 mt-1">↑ +0.3 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AVG DURATION</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.avgDuration}m</div>
            <p className="text-xs text-red-600 mt-1">↓ -2m from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Interview Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Interview Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trendsData.length > 0 ? (
              <ChartContainer
                config={{
                  total: {
                    label: "Total Interviews",
                    color: "#A855F7",
                  },
                  recommended: {
                    label: "Recommended",
                    color: "#10B981",
                  },
                }}
                className="h-[300px] w-full"
              >
                <AreaChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#A855F7"
                    fill="#A855F7"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="recommended"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Score Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Score Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scoreDistribution.length > 0 ? (
              <ChartContainer
                config={{
                  excellent: { label: "Excellent (45-50)", color: "#4F46E5" },
                  good: { label: "Good (35-44.9)", color: "#F59E0B" },
                  fair: { label: "Fair (25-34.9)", color: "#F59E0B" },
                  poor: { label: "Poor (0-24.9)", color: "#EF4444" },
                }}
                className="h-[300px] w-full"
              >
                <PieChart>
                  <Pie
                    data={scoreDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-xs">{value}</span>}
                  />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
