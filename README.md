# FindYourJob

FindYourJob is a modern job board web application, inspired by platforms like Indeed and LinkedIn Jobs. It allows users to browse, apply for jobs, and for recruiters (admins) to post and manage job offers.  
This project is built with React (Material UI) and uses JSON Server as a mock backend for development and testing.

---

## 🖥️ Project Overview

**Features:**

- **Authentication:** Register and login with "user" (candidate) or "admin" (recruiter) roles.
- **Job Management:**
  - Admins can create, view, and delete job offers.
  - Users can browse job listings, view detailed descriptions, and apply.
- **Application Flow:**
  - Candidates apply for jobs with a cover letter and upload a CV (PDF simulation).
  - Admins can view all applicants for their job offers, download CVs, and read cover letters in detail.
- **UI/UX:**  
  - Fully responsive, Material UI-based, light & clean style.
  - Forms with live validation, clear error messages, and feedback.
- **Routing:**  
  - Main pages: Home, Login, Register, Jobs, Job Details, Apply, Applications.

---
## How to lunch it
  - Install node modules dependency from both project db-json and find-your-job with the command "npm install" using the cmd in the path of the projects.
  - Execute both project using the command "npm run dev"
  - There are already two users [username: user, password: user] and [username: admin, password: admin] but feel free to create your own