
import { JobFormData } from "@/types/job";
import routes from "../api/routes"
import { getAuthToken } from "@/utils/token";

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

  return { createJob, deleteJob };
};

export default JobScheduleApi;
