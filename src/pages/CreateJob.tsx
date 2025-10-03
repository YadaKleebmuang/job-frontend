// src/pages/CreateJob.tsx
import React, { useState, useEffect } from "react";
import { createJob } from "../services/jobService";
import { getCategories } from "../services/categoryService"; // เรียก service ดึง categories
import type { Job } from "../types/job"; // ✅ type-only import
import type { Category } from "../types/category"; // ✅ type-only import

// ใช้ type สำหรับฟอร์ม
type CreateJobFormState = Omit<Job, "jobId" | "postedAt" | "status"> & {
  budgetMin?: number | "";
  budgetMax?: number | "";
  posterEmail: string;
};

export default function CreateJob() {
  const [jobData, setJobData] = useState<CreateJobFormState>({
    title: "",
    description: "",
    categoryId: 0,
    posterName: "",
    posterEmail: "",
    budgetMin: 0,
    budgetMax: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ State สำหรับ checkbox ยอมรับเงื่อนไข
  const [acceptTerms, setAcceptTerms] = useState(false);

  // -------------------------------------------------------------------
  // 💡 ดึง Categories จาก API เหมือน JobList
  // -------------------------------------------------------------------
  useEffect(() => {
    setIsCategoryLoading(true);
    getCategories()
      .then(setCategories)
      .catch(() => console.error("Failed to fetch categories."))
      .finally(() => setIsCategoryLoading(false));
  }, []);

  // -------------------------------------------------------------------
  // ฟังก์ชันจัดการการเปลี่ยนค่าฟอร์ม
  // -------------------------------------------------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const processedValue =
      name === "budgetMin" || name === "budgetMax"
        ? value === ""
          ? ""
          : parseFloat(value)
        : value;
    setJobData({ ...jobData, [name]: processedValue });
  };

  // -------------------------------------------------------------------
  // ฟังก์ชัน submit
  // -------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 ตรวจสอบว่าผู้ใช้ยอมรับเงื่อนไขหรือยัง
    if (!acceptTerms) {
      setMessage("❌ คุณต้องยอมรับเงื่อนไขการใช้งานก่อนโพสต์งาน");
      return;
    }

    setIsPosting(true);
    setMessage("");

    const jobToSend: Partial<Job> = {
      ...jobData,
      budgetMin: jobData.budgetMin ? Number(jobData.budgetMin) : undefined,
      budgetMax: jobData.budgetMax ? Number(jobData.budgetMax) : undefined,
    };

    try {
      console.log("Sending job:", jobToSend);
      const created = await createJob(jobToSend as Job);
      setMessage(`✅ โพสต์งานสำเร็จ! รหัสงาน: ${created.jobId}`);
    } catch (error: any) {
      console.error("Create job failed:", error.response || error);
      setMessage(
        `❌ เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsPosting(false);
    }
  };

// -------------------------------------------------------------------
  // JSX
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8 border-b pb-4">
          โพสต์งานใหม่
        </h1>

        {message && (
          <div
            className={`p-4 mb-6 rounded-lg text-center font-medium ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ชื่อตำแหน่ง/โปรเจกต์
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              รายละเอียดงาน
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={jobData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              หมวดหมู่
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={jobData.categoryId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isCategoryLoading}
            >
              <option value={0}>
                {isCategoryLoading ? "กำลังโหลด..." : "เลือกหมวดหมู่"}
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="budgetMin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                งบประมาณต่ำสุด (บาท)
              </label>
              <input
                type="number"
                id="budgetMin"
                name="budgetMin"
                value={jobData.budgetMin}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="budgetMax"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                งบประมาณสูงสุด (บาท)
              </label>
              <input
                type="number"
                id="budgetMax"
                name="budgetMax"
                value={jobData.budgetMax}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Poster Name & Email */}
          <div>
            <label
              htmlFor="posterName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ชื่อผู้ติดต่อ
            </label>
            <input
              type="text"
              id="posterName"
              name="posterName"
              value={jobData.posterName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="posterEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              อีเมลติดต่อ
            </label>
            <input
              type="email"
              id="posterEmail"
              name="posterEmail"
              value={jobData.posterEmail}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Checkbox ยอมรับเงื่อนไขการใช้งาน */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-700">
              ฉันยอมรับ{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                เงื่อนไขการใช้งาน
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPosting}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
              isPosting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isPosting ? "กำลังโพสต์งาน..." : "ประกาศงานใหม่"}
          </button>
        </form>
      </div>
    </div>
  );
}
