
import { useQuery } from '@tanstack/react-query';
import { getAuthToken } from "@/utils/token";

export interface Candidate {
  id: string; // we will map _id to id
  fullName: string;
  email: string;
  phone: string | null;
  totalExperienceYears?: number | null;
  skills: string[];
  education: any[]; // Or define a more specific type if needed
  experience: any[]; // Or define a more specific type if needed
  createdAt: string;
}

export interface CandidatesResponse {
  data: Candidate[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const fetchCandidates = async (page = 1, limit = 10): Promise<CandidatesResponse> => {
  const token = getAuthToken();
  const response = await fetch(`/api/candidates?page=${page}&limit=${limit}`, {
     headers: {
        'Authorization': `Bearer ${token}`
     }
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const json = await response.json();
  
  // Handle potentially flat array or object response structure similar to jobs
  const candidatesArray = Array.isArray(json) ? json : json.data || json.candidates || [];
  
  const data = candidatesArray.map((c: any) => ({
      ...c,
      id: c._id || c.id,
      phone: c.phone || c.mobileNumber || "N/A",
      totalExperienceYears: c.totalExperienceYears,
      skills: c.skills || [],
      education: c.education || [],
      experience: c.experience || []
  }));
  
  // Construct pagination metadata
  const pagination = json.pagination || {
    total: data.length,
    page: page,
    limit: limit,
    totalPages: Math.ceil(data.length / limit) || 1
  };

  return { data, pagination };
};

export const useCandidates = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['candidates', page, limit],
    queryFn: () => fetchCandidates(page, limit),
  });
};
