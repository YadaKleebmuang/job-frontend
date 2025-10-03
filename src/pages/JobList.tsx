import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Job } from "../types/job";
import { getJobs } from "../services/jobService";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import JobCard from "../components/JobCard";

// ชนิดข้อมูลสำหรับตัวกรอง
type FilterOption = Job["status"] | "all";
type CategoryFilterOption = number | "all";

export default function JobList() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterOption>("all");
  const [filterCategoryId, setFilterCategoryId] =
    useState<CategoryFilterOption>("all");
  const [budgetMin, setBudgetMin] = useState<string>("");
  const [budgetMax, setBudgetMax] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  // ดึงรายการงาน
  useEffect(() => {
    setIsLoading(true);
    getJobs()
      .then(setJobs)
      .catch(() => console.error("Failed to fetch jobs."))
      .finally(() => setIsLoading(false));
  }, []);

  // ดึงรายการหมวดหมู่
  useEffect(() => {
    setIsCategoryLoading(true);
    getCategories()
      .then(setCategories)
      .catch(() => console.error("Failed to fetch categories."))
      .finally(() => setIsCategoryLoading(false));
  }, []);

  // กรองข้อมูลตามตัวเลือกต่างๆ
  const filteredJobs = useMemo(() => {
    const minBudget = Number(budgetMin) || 0;
    const maxBudget = Number(budgetMax) || Infinity;
    const categoryIdToFilter =
      filterCategoryId === "all" ? "all" : Number(filterCategoryId);

    return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || job.status === filterStatus;
      const matchesCategory =
        categoryIdToFilter === "all" || job.categoryId === categoryIdToFilter;

      const jobMin = job.budgetMin || 0;
      const jobMax = job.budgetMax ?? jobMin;
      const matchesBudget =
        (minBudget === 0 || jobMax >= minBudget) &&
        (maxBudget === Infinity || jobMin <= maxBudget);

      return matchesSearch && matchesStatus && matchesCategory && matchesBudget;
    });
  }, [jobs, search, filterStatus, filterCategoryId, budgetMin, budgetMax]);

  // ฟังก์ชันคลิก JobCard -> ไปหน้า JobDetail
  const handleJobClick = (jobId: number) => {
    navigate(`/job/${jobId}`);
  };

  // 💡 UI/JSX ที่ตกแต่งด้วย Tailwind CSS (ปรับปรุง Dropdown Category)
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-4 max-w-5xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700">
            รายการประกาศงาน Freelance
          </h1>
          <p className="text-gray-500 mt-2">
            ค้นหาโปรเจกต์ที่น่าสนใจ ({filteredJobs.length} รายการ)
          </p>
        </header>

        {/* Filters */}
        <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">ตัวกรอง</h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="ค้นหาชื่อตำแหน่ง..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterOption)}
              className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="open">✅ เปิดรับ</option>
              <option value="pending">⏳ รอดำเนินการ</option>
              <option value="closed">❌ ปิดรับแล้ว</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filterCategoryId}
              onChange={(e) =>
                setFilterCategoryId(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isCategoryLoading}
            >
              <option value="all">
                {isCategoryLoading
                  ? "กำลังโหลดประเภทงาน..."
                  : "หมวดหมู่ทั้งหมด"}
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="งบต่ำสุด"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
              min="0"
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="งบสูงสุด"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              min="0"
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Job Cards */}
        {isLoading ? (
          <p className="text-center text-gray-500">กำลังโหลดงาน...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredJobs
              .filter((job) => job.jobId !== undefined)
              .map((job) => (
                <JobCard
                  key={job.jobId}
                  job={job}
                  categories={categories} // ✅ ส่ง prop
                  onClick={() => handleJobClick(job.jobId!)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
