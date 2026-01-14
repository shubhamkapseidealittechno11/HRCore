"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import useAuthService from "@/app/api/auth";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { logout } = useAuthService();

  const handleLogout = () => {
    // This will show SweetAlert and handle logout properly
    logout();
  };

  return (
    <div className={cn("flex h-full flex-col border-r bg-card text-card-foreground", className)}>
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold bg-gradient-to-tr from-primary to-purple-600 bg-clip-text text-transparent">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {PROTECTED_ROUTES.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === route.path ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
