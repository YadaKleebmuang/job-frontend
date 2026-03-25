# 🎯 JobFinder — Job Posting & Search Platform Frontend

JobFinder is a modern React-based frontend application for job seekers and employers to post, search, and manage job opportunities. It provides a user-friendly interface for browsing jobs with advanced filtering, creating new job postings, and managing job details with contact and reporting features.

It serves as a comprehensive platform connecting job seekers with employers through an intuitive web interface.
---
## 🚀 Features
* 🔍 Advanced Job Search & Filtering (by title, category, budget, status)
* 📝 Job Posting System (with category selection and terms acceptance)
* 👁️ Detailed Job View (with contact modal and reporting)
* 🔐 Admin Authentication (mock login system)
* 📊 Job Management Dashboard (for admins)
* 🏷️ Category-based Organization
* 📱 Responsive Design with Tailwind CSS
* 🛡️ Terms & Conditions Integration
* 🚨 Job Reporting System
---
## 🏗 Tech Stack
* **Frontend:** React 19, TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS 4.x
* **Routing:** React Router DOM 7.x
* **HTTP Client:** Axios
* **Development:** ESLint, TypeScript ESLint
* **Package Manager:** npm
---
## 📂 Project Structure
```
src/
  components/
    JobCard.tsx          → Job listing card component
    NavBar.tsx           → Navigation bar with role-based links
  pages/
    JobList.tsx          → Main job listing with filters
    CreateJob.tsx        → Job creation form
    JobDetail.tsx        → Job details with contact/report modals
    Login.tsx            → Admin login page (mock)
    ReportPage.tsx       → Job reporting form
    TermsPage.tsx        → Terms and conditions
  services/
    jobService.ts        → API calls for job CRUD operations
    categoryService.ts   → API calls for category management
  types/
    job.ts               → Job data interfaces
    category.ts          → Category data interfaces
    user.ts              → User and role type definitions
  App.tsx                → Main app with routing
  main.tsx               → App entry point
public/
  index.html             → Main HTML template
vite.config.ts           → Vite configuration
tailwind.config.js       → Tailwind CSS configuration
```
---
## 🧠 Project Concept
A comprehensive job platform frontend designed to:
* Provide seamless job search experience with multiple filter options
* Enable employers to easily post and manage job opportunities
* Ensure user safety through reporting and terms acceptance
* Support role-based access (seekers, posters, admins)
* Deliver responsive and modern user interface
* Integrate with backend APIs for full functionality
---
## 📌 Current Progress
* ✅ Phase 1: Job Listing & Search complete
* ✅ Phase 2: Job Creation System complete
* ✅ Phase 3: Job Details & Contact complete
* ✅ Phase 4: Admin Authentication (mock) complete
* ✅ Phase 5: Reporting System complete
* 🚧 Phase 6: Advanced features (real auth, admin dashboard) in planning
