"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, clearError } from "@/store/slices/authSlice";
import { loginSchema, LoginSchemaType } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorMessage } from "@/components/common/error-message";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useAuthService from "@/app/api/auth";
import { jwtDecode } from "jwt-decode";
import { encryptData } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthService();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only check after component has mounted
    if (!isMounted) return;

    // Double-check localStorage to ensure we actually have a valid session
    // This prevents redirect if Redux has stale state but localStorage is cleared
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (isAuthenticated && token && userData) {
      router.push("/dashboard");
    }
    
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, router, dispatch, isMounted]);

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await login(data);
      
      // Check if response is valid and contains token
      // Adjust field name 'token' or 'accessToken' based on actual API response
      // For now, checking typical fields, or if response itself is the token string
      const token = response?.access_token || response?.result?.token; 

      if (token) {
        // Fallback: if 'token' field doesn't exist, maybe the response IS the token or user object?
        // User asked to use jwtDecode, so there MUST be a token.
        // We will assume 'token' exists or response is it.
        const tokenToDecode = token;
        
        if (tokenToDecode) {
             const decodedUser = jwtDecode(tokenToDecode);
             console.log("decodedUser", decodedUser);
             // Encrypt and store user data
             const encryptedData = encryptData(decodedUser);
             if (encryptedData) {
                 localStorage.setItem("userData", encryptedData);
                 localStorage.setItem("token", tokenToDecode);
             }

             // Dispatch to Redux
             dispatch(setUser(decodedUser));
             toast.success("Login successful!");
             router.push("/dashboard");
        } else {
             // If we can't find a token but got a success response, maybe it's just user data?
             // But user explicitly asked for jwtDecode.
             // We'll assume failure to interpret response if no token.
            //  console.error("No token found in response", response);
             toast.error("Login failed: Invalid server response.");
        }
      } else {
         toast.error("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
        toast.error("Uh oh! Something went wrong.", {
            description: err.message || "An unexpected error occurred.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-muted/20">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ErrorMessage message={error} />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                        disabled={isLoading}
                        className="pr-10" // Add padding right for the icon
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="/register" className="ml-1 font-medium text-primary hover:underline">
          Sign up
        </a>
      </CardFooter>
    </Card>
  );
}
