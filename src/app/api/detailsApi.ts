
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
const DetailsService = () => {

 
  const  resultDetail = async (id: any) => {
    try {
      const url = await routes.USER_RESULT_DETAIL(id);
      const userData = localStorage.getItem(userLocalStorageKey);
      const token = localStorage.getItem(tokenLocalStorageKey);
     
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get user result detail. Something went wrong.");
      throw error;
    }
  }
  
  const  jobDetail = async (id: any) => {
    try {
      const url = await routes.JOB_DETAIL(id);
      const userData = localStorage.getItem(userLocalStorageKey);
      const token = localStorage.getItem(tokenLocalStorageKey);
     
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get user result detail. Something went wrong.");
      
    }
  }
 

  return { resultDetail, jobDetail };
};

export default DetailsService;

