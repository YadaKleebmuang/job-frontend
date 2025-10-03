// src/types/user.ts

// กำหนด type ของ Role ให้ตรงกับ backend
export type UserRole = "seeker" | "poster" | "admin";

export interface User {
  userId: number;       // PK
  name: string;         // ชื่อผู้ใช้
  email: string;        // อีเมล
  password?: string;    // รหัสผ่าน (optional เพราะ backend กำหนด nullable)
  role: UserRole;       // seeker, poster, admin

  // optional relation fields
  adminLogs?: AdminLog[];
  jobs?: Job[];
}

// relation types (สามารถแยกเป็นไฟล์เองได้ถ้ามีใช้จริง)
export interface AdminLog {
  adminLogId: number;
  action: string;
  createdAt: string; // DateTime → string (ISO format)
}

export interface Job {
  jobId: number;
  title: string;
  status: string;
  posterName: string;
}
