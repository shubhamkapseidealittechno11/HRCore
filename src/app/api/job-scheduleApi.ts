
import { JobFormData } from "@/types/job";
import routes from "../api/routes"
import { getAuthToken } from "@/utils/token";
import Swal from "sweetalert2";

const JobScheduleApi = () => {

  const createJob = async (data: JobFormData) => {
    try {
        const url = routes.CREATE_JOB()
      const token = getAuthToken();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to create job");
      }

      return await response.json();
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  const deleteJob = async (id: string) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'swal-theme-popup',
        title: 'swal-theme-title',
        htmlContainer: 'swal-theme-text',
        confirmButton: 'swal-theme-confirm',
        cancelButton: 'swal-theme-cancel',
        actions: 'swal-theme-actions',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = routes.DELETE_JOB(id)
          const token = getAuthToken();
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error || "Failed to delete job");
          }

          return await response.json();
        } catch (error: any) {
          console.error(error);
          throw error;
        }
      }
    });
  }

   const createJobSchedule = async (id: string, formData: FormData) => {
    try {
        const url = routes.CREATE_JOB_SCHEDULE(id)
        const token = getAuthToken();
      // NOTE: Do NOT set Content-Type header when sending FormData; 
      // fetch will automatically set it with the correct boundary.
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData?.error || "Failed to add candidate");
      }

      return await response.json();
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  return { createJob, deleteJob, createJobSchedule };
};

export default JobScheduleApi;
