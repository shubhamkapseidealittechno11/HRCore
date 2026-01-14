import { useQuery } from '@tanstack/react-query';
import { Job } from '@/types/job';

export interface JobsResponse {
  data: Job[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const fetchJobs = async (page = 1, limit = 10): Promise<JobsResponse> => {
  const response = await fetch(`/api/jobs?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  
  // Handing both array response and object response
  const jobsArray = Array.isArray(json) ? json : json.data || [];
  
  // Map _id to id for consistency with the Job type
  const data = jobsArray.map((job: any) => ({
    ...job,
    id: job._id || job.id
  }));

  // Construct pagination metadata
  // If the API returns a flat array, we treat it as page 1 with no total pages known
  // If it's the expected object structure, we preserve it.
  const pagination = json.pagination || {
    total: data.length,
    page: page,
    limit: limit,
    totalPages: Math.ceil(data.length / limit) || 1
  };

  return { data, pagination };
};

export const useJobs = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['jobs', page, limit],
    queryFn: () => fetchJobs(page, limit),
  });
};
