
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'temporary';
export type WorkMode = 'remote' | 'hybrid' | 'onsite';

export interface Job {
  id: string;
  jobTitle: string;
  jobDescription: string;
  employmentType: EmploymentType;
  experienceRequired: string;
  jobLocation: string;
  workMode: WorkMode;
  vacancies: number;
  totalCandidates: number;
  createdAt: string;
}

export interface JobFormData {
  jobTitle: string;
  jobDescription: string;
  employmentType: EmploymentType;
  experienceRequired: string;
  jobLocation: string;
  workMode: WorkMode;
  vacancies: number;
}
