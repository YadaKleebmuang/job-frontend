// src/services/jobService.ts
import axios from "axios";
import type { Job } from "../types/job";

const API_URL = `${import.meta.env.VITE_API_URL}/job`;
if (!API_URL) throw new Error("Missing VITE_API_URL");

// ------------------ Jobs ------------------

export const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getJobById = async (id: number): Promise<Job> => {
  const response = await axios.get<Job>(`${API_URL}/${id}`);
  return response.data;
};

export const createJob = async (job: Partial<Job>): Promise<Job> => {
  const response = await axios.post(API_URL, job);
  return response.data;
};

export const updateJob = async (id: number, job: Job, token: string): Promise<Job> => {
  const response = await axios.put<Job>(`${API_URL}/${id}`, job, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteJob = async (id: number, token: string): Promise<{ success: boolean }> => {
  const response = await axios.delete<{ success: boolean }>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// รายงานประกาศ
export const reportJob = async (
  id: number,
  reason: string,
  reporterEmail?: string // เพิ่ม reporterEmail
): Promise<{ success: boolean }> => {
  const payload = { reason, reporterEmail }; // ส่งตรงกับ DTO
  const response = await axios.post<{ success: boolean }>(
    `${API_URL}/${id}/report`,
    payload
  );
  return response.data;
};