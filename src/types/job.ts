// src/types/job.ts
export interface Job {
  jobId?: number;
  title: string;
  description: string;
  categoryId: number;
  budgetMin?: number;
  budgetMax?: number;
  status?: string; // open, closed, deleted
  postedAt?: string;
  posterName: string;
  posterEmail: string;
  manageToken?: string;
  expireDate?: string;
}