import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Admin Dashboard",
  description: "Create a new account to access the admin panel",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-muted/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="z-10 w-full max-w-2xl">
        <RegisterForm />
      </div>
    </main>
  );
}
