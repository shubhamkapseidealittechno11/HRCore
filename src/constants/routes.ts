import { LayoutDashboard, Users, Calendar, Briefcase, FileText } from "lucide-react";

export const PROTECTED_ROUTES = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/candidates",
    label: "Candidates",
    icon: Users,
  },
   {
    path: "/job-schedule",
    label: "Job Schedule",
    icon: Briefcase,
  },
  {
    path: "/schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    path: "/user-results",
    label: "User Results",
    icon: FileText,
  },
];

export const APP_ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
};
