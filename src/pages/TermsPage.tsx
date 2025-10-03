// src/pages/TermsPage.tsx
// import React from "react";
import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6 border-b pb-4">
          เงื่อนไขการใช้งาน (Terms & Conditions)
        </h1>

        <div className="space-y-4 text-gray-700">
          <p>
            ยินดีต้อนรับสู่แพลตฟอร์มของเรา ก่อนใช้งาน โปรดอ่านและยอมรับเงื่อนไขต่อไปนี้:
          </p>

          <ol className="list-decimal list-inside space-y-2">
            <li>
              ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันเกี่ยวกับตนเอง
            </li>
            <li>
              ห้ามโพสต์งานหรือเนื้อหาที่ละเมิดกฎหมาย ละเมิดลิขสิทธิ์ หรือไม่เหมาะสม
            </li>
            <li>
              ผู้ใช้ต้องรับผิดชอบต่อเนื้อหาที่ตนเองโพสต์
            </li>
            <li>
              แพลตฟอร์มขอสงวนสิทธิ์ในการลบหรือแก้ไขเนื้อหาที่ไม่เหมาะสม
            </li>
            <li>
              การใช้แพลตฟอร์มถือว่าผู้ใช้ยอมรับเงื่อนไขเหล่านี้ทั้งหมด
            </li>
          </ol>

          <p>
            หากคุณยอมรับเงื่อนไขเหล่านี้ คุณสามารถกลับไป{" "}
            <Link
              to="/create-job"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              หน้าโพสต์งาน
            </Link>{" "}
            และดำเนินการต่อได้
          </p>
        </div>
      </div>
    </div>
  );
}
