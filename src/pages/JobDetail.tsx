// src/pages/JobDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById, reportJob } from "../services/jobService";
import { getCategories } from "../services/categoryService";
import type { Job } from "../types/job";
import type { Category } from "../types/category";

// ฟังก์ชัน Utility สำหรับกำหนดสีสถานะ
const getStatusClasses = (status: Job["status"]) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ State สำหรับ Modal
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ✅ ฟอร์มติดต่อผู้โพสต์
  const [contactMessage, setContactMessage] = useState("");

  // ✅ ฟอร์มรายงานประกาศ
  const [reportReason, setReportReason] = useState("");
  const [reportMessage, setReportMessage] = useState("");

  // โหลดข้อมูลงาน
  useEffect(() => {
    if (id) {
      getJobById(Number(id))
        .then(setJob)
        .catch(() => setJob(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setJob(null);
    }
      getCategories()
      .then(setCategories)
      .catch(() => console.error("Failed to fetch categories."));
  }, [id]);

    const categoryName = job
    ? categories.find((cat) => cat.categoryId === job.categoryId)?.categoryName
    : "";

  // -------------------------------------------------------------------
  // ติดต่อผู้โพสต์งาน (ผ่าน mailto:)
  // -------------------------------------------------------------------
  const handleSendContact = () => {
    if (job?.posterEmail) {
      window.location.href = `mailto:${job.posterEmail}?subject=สนใจสมัครงาน: ${job.title}&body=${encodeURIComponent(contactMessage)}`;
    }
    setIsContactOpen(false);
    setContactMessage("");
  };

  // รายงานประกาศไม่เหมาะสม
  const handleSendReport = async () => {
    if (!job?.jobId) return;

    if (reportReason.trim().length < 5) {
      setReportMessage("⚠️ กรุณากรอกเหตุผลอย่างน้อย 5 ตัวอักษร");
      return;
    }

    try {
      await reportJob(job.jobId, reportReason);
      setReportMessage("✅ รายงานประกาศสำเร็จ ขอบคุณสำหรับความช่วยเหลือ!");
      setReportReason("");
      setIsReportOpen(false);
    } catch (error) {
      console.error(error);
      setReportMessage("❌ รายงานไม่สำเร็จ ลองใหม่อีกครั้ง");
    }
  };

  // ... (UI: Loading / Not Found โค้ดเดิม) ...
  if (loading)
    return (
      <div className="min-h-[50vh] flex justify-center items-center p-8">
        <p className="text-xl text-indigo-500">⏳ กำลังโหลดข้อมูลงาน...</p>
      </div>
    );
  if (!job)
    return (
      <div className="min-h-[50vh] flex justify-center items-center p-8">
        <p className="text-xl text-red-500">❌ ไม่พบงานที่คุณกำลังค้นหา</p>
      </div>
    );

  // -------------------------------------------------------------------
  // 💡 UI: รายละเอียดงาน (ปรับปรุงส่วน Sidebar)
  // -------------------------------------------------------------------
    return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8 border-t-4 border-indigo-600">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 ${getStatusClasses(
              job.status
            )}`}
          >
            {job.status}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <span className="mr-4">
              โพสต์โดย:{" "}
              <strong className="text-gray-700">{job.posterName}</strong>
            </span>
            {job.postedAt && (
              <span>
                เมื่อ:{" "}
                {new Date(job.postedAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              รายละเอียดโครงการ
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Budget */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-600 mb-3">💰 งบประมาณ</h3>
              {job.budgetMin && job.budgetMax ? (
                <p className="text-2xl font-extrabold text-gray-900">
                  {job.budgetMin.toLocaleString()} -{" "}
                  {job.budgetMax.toLocaleString()} บาท
                </p>
              ) : (
                <p className="text-gray-500">ยังไม่ระบุงบประมาณที่ชัดเจน</p>
              )}
            </div>

            {/* General Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">
                ข้อมูลทั่วไป
              </h3>
              <div className="text-sm text-gray-700 space-y-3">
                <p className="flex justify-between">
                  <strong className="text-gray-500">หมวดหมู่:</strong>{" "}
                  <span>{categoryName || "ไม่พบหมวดหมู่"}</span>
                </p>
                <p className="flex justify-between">
                  <strong className="text-gray-500">Job ID:</strong>{" "}
                  <span>{job.jobId}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                onClick={() => setIsContactOpen(true)}
              >
                📧 ติดต่อผู้โพสต์งาน
              </button>
              <button
                className="w-full py-2 px-4 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 text-sm"
                onClick={() => setIsReportOpen(true)}
              >
                🚩 รายงานประกาศไม่เหมาะสม
              </button>
              
              {reportMessage && (
                <p
                  className={`text-xs p-2 rounded ${
                    reportMessage.startsWith("✅")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {reportMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Contact Poster */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-3">📧 ติดต่อผู้โพสต์งาน</h2>
            <p className="text-sm mb-2">
              อีเมลผู้โพสต์:{" "}
              <span className="font-medium text-indigo-600">
                {job?.posterEmail || "ไม่พบอีเมล"}
              </span>
            </p>
            <textarea
              className="w-full border rounded-md p-2 mb-3"
              rows={4}
              placeholder="เขียนข้อความของคุณ..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsContactOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleSendContact}
              >
                ส่งข้อความ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Report Job */}
      {isReportOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-3">🚩 รายงานประกาศไม่เหมาะสม</h2>
            <textarea
              className="w-full border rounded-md p-2 mb-3"
              rows={4}
              placeholder="กรุณากรอกเหตุผล..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsReportOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleSendReport}
              >
                ส่งรายงาน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}