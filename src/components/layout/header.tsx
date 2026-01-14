"use client";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r w-72">
            <Sidebar className="h-full border-none" />
          </SheetContent>
        </Sheet>
        <span className="font-bold text-lg">Admin Panel</span>
      </div>

      <div className="hidden lg:block font-medium text-sm text-muted-foreground">
        Welcome back, Admin
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
