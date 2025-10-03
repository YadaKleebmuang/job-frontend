// src/components/JobCard.tsx
import React from "react";
// import { getCategories } from "../services/categoryService";
import type { Job } from "../types/job";
import type { Category } from "../types/category";

interface JobCardProps {
  job: Job;
  onClick?: (id: number) => void; // คลิกเพื่อดูรายละเอียดงาน
  categories: Category[];
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, categories }) => {
  const categoryName =
    categories.find((cat) => cat.categoryId === job.categoryId)?.categoryName ||
    "ไม่พบหมวดหมู่";

  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer bg-white"
      onClick={() => job.jobId && onClick?.(job.jobId)}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {job.description}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <span>หมวดหมู่: {categoryName}</span>
        {job.budgetMin && job.budgetMax && (
          <span>
            งบประมาณ: {job.budgetMin} - {job.budgetMax} บาท
          </span>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>โดย {job.posterName}</span>
        {job.postedAt && (
          <span>
            {new Date(job.postedAt).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
