// src/pages/ReportPage.tsx
import React, { useState } from "react";

export default function ReportPage() {
  const [report, setReport] = useState({
    jobId: "",
    reason: "",
    details: "",
    reporterEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เรียก API ส่งรายงานไป Backend (ตอนนี้ mock ไว้ก่อน)
    console.log("Report submitted:", report);
    setMessage("✅ ส่งรายงานเรียบร้อย ขอบคุณที่ช่วยแจ้ง!");
    setReport({ jobId: "", reason: "", details: "", reporterEmail: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          รายงานประกาศไม่เหมาะสม
        </h1>

        {message && (
          <div className="p-4 mb-6 rounded-lg bg-green-100 text-green-800 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">รหัสประกาศงาน (Job ID)</label>
            <input
              type="text"
              name="jobId"
              value={report.jobId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">เหตุผล</label>
            <input
              type="text"
              name="reason"
              value={report.reason}
              onChange={handleChange}
              required
              placeholder="เช่น ข้อมูลไม่ถูกต้อง, เนื้อหาไม่เหมาะสม"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">รายละเอียดเพิ่มเติม</label>
            <textarea
              name="details"
              value={report.details}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-3 resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">อีเมลผู้แจ้ง (ถ้ามี)</label>
            <input
              type="email"
              name="reporterEmail"
              value={report.reporterEmail}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
          >
            ส่งรายงาน
          </button>
        </form>
      </div>
    </div>
  );
}
