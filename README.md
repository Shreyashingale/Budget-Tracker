# 💸 Budget Tracker App

A full-stack personal finance tracker built with **Django REST Framework** and **React + TypeScript**.  
Track your income, expenses, and budget in real-time — complete with D3.js visualizations.

---

## 🚀 Features

- ✅ JWT-based authentication
- ✅ Add, edit, delete transactions
- ✅ Filter transactions by category, date, or amount
- ✅ Monthly budget comparison (actual vs target)
- ✅ Data visualizations using D3.js
- ✅ Responsive UI with protected routes
- ✅ Separate backend (Django) and frontend (React)

---

## 🛠 Tech Stack

| Layer     | Tech                       |
|-----------|----------------------------|
| Frontend  | React + TypeScript, Axios  |
| Backend   | Django + DRF + SimpleJWT   |
| Database  | SQLite (dev)               |
| Charts    | D3.js                      |
| Auth      | JWT (via djangorestframework-simplejwt) |

---

## 📦 Folder Structure

```plaintext
budget-tracker/
├── backend/           # Django project
│   ├── tracker_app/
│   ├── budget_tracker/
│   ├── db.sqlite3
│   └── manage.py
├── frontend/          # React app (Vite + TS)
│   ├── src/
│   └── vite.config.ts
└── README.md
