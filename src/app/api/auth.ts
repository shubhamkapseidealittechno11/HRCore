
const userLocalStorageKey = "userData";
const tokenLocalStorageKey = "token";

import { jwtDecode } from "jwt-decode";
import {
  decryptData,
  encryptData
} from "@/lib/utils";
import { setUser, logoutUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import Swal from "sweetalert2";
import { toast } from "sonner";
import routes from "./routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Pure API object


// Hook for Component usage provided for backward compatibility or UI-heavy auth logic
const AuthService = () => {

  const dispatch = useAppDispatch();
  const [userLocalInfo, setUserInfoStorageState]: any = useState({});
  const route = useRouter();

 
  const  login = async (data: any) => {
    try {
      const url = await routes.LOGIN();
      const body = {
        email: data?.email.toLowerCase(),
        password: data?.password,
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      };
      const response = await fetch(url, options);
      if (!response.ok) {
         // Handle non-200 if needed, but for now just parse
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  const logout = async () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      iconColor: '#f59e0b',
      showCancelButton: true,
      allowOutsideClick: false,
      backdrop: false, // Totally prevents the screen overlay
      showClass: {
        popup: '', // Disable fade-in animation which can look transparent
      },
      hideClass: {
        popup: '', // Disable fade-out animation
      },
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'swal-theme-popup',
        title: 'swal-theme-title',
        htmlContainer: 'swal-theme-text',
        confirmButton: 'swal-theme-confirm',
        cancelButton: 'swal-theme-cancel',
      },
    }).then(async (result: any) => {
      try {
        if (result?.value) {
          // Clear localStorage FIRST to prevent rehydration
          localStorage.removeItem(userLocalStorageKey);
          localStorage.removeItem(tokenLocalStorageKey);
          
          // Clear Redux state
          dispatch(logoutUser());
          
          // Show success message
          toast.success("Logout successfully!");
          
          // Navigate to home page
          route.push("/");
        }
      } catch (error: any) {
        toast.error("Uh oh! Something went wrong.", {
          description: error?.message || "Failed to logout. Please try again.",
        });
      }
    })
  }

  const directLogout = async () => {
    try {
      localStorage.removeItem(userLocalStorageKey);
      localStorage.removeItem(tokenLocalStorageKey);
      dispatch(logoutUser());
      route.push("/");
    } catch (error: any) {
      toast.error("Failed to logout. Something went wrong.", {
        description: error?.message
      });
    }
  }

  const register = async (data: any) => {
    try {
      const url = await routes.REGISTER();
      const body = {
        full_name: data?.full_name,
        company_name: data?.company_name,
        email: data?.email.toLowerCase(),
        mobile_number: data?.mobile_number,
        password: data?.password,
        confirm_password: data?.confirm_password,
        profile_photo: data?.profile_photo || "",
        role: data?.role || "admin",
        status: data?.status || "active",
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Registration failed");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { logout, directLogout, login, register };
};

export default AuthService;

