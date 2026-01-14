"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { toast } from "sonner";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Allow Redux to rehydrate before checking auth
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only check authentication after component has mounted and Redux is initialized
    if (!isMounted || !isInitialized) return;

    if (!isAuthenticated) {
      toast.error("Unauthorized access attempt. Please login.");
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, [isAuthenticated, isInitialized, router, isMounted]);

  if (!isInitialized || (!isAuthenticated && !isAuthorized)) {
      // Return null or loader while checking auth state
      return (
          <div className="h-screen w-screen flex items-center justify-center bg-background">
              <LoadingSpinner size={40} />
          </div>
      );
  }

  // Prevent flash of content if state updates are slow, though unlikely with client redux.
  if (!isAuthorized) return null; 

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-muted/10">
      {/* Sidebar - Hidden on mobile (handled by Header Sheet), Visible on Desktop */}
      <aside className="hidden w-64 shrink-0 lg:block border-r bg-card fixed inset-y-0 left-0 z-40">
        <Sidebar className="h-full w-full" />
      </aside>

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
