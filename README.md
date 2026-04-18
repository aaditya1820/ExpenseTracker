# Expense Tracker - Full Stack Application

A comprehensive, full-stack personal finance management application designed to help users track their income, expenses, and financial goals with ease. Built with a modern tech stack focusing on performance and user experience.

## 🚀 Features

- **User Authentication**: Secure sign-up and login functionality using JWT and Bcrypt encryption.
- **Interactive Dashboard**: A visual overview of your financial status featuring dynamic charts built with Recharts.
- **Income Tracking**: Log and manage different sources of income with ease.
- **Expense Management**: Categorize and monitor your spending habits to identify saving opportunities.
- **Financial Goals**: Set monthly income targets and expense limits to maintain financial discipline.
- **Data Export**: Generate and download financial reports in **PDF** and **Excel** formats for offline analysis.
- **Profile Management**: Customize your profile and upload profile pictures.
- **Responsive Design**: A sleek, modern UI built with Tailwind CSS that works perfectly across all devices.

## 🛠️ Tech Stack

### Frontend
- **React**: For building a dynamic and responsive user interface.
- **Vite**: Modern frontend build tool for a fast development experience.
- **Tailwind CSS**: For utility-first styling and premium aesthetics.
- **Recharts**: For data visualization and interactive financial charts.
- **React Router**: For seamless client-side navigation.
- **Axios**: For handling API requests to the backend.

### Backend
- **Node.js & Express**: A robust and scalable server-side environment.
- **Prisma**: Type-safe ORM for database management.
- **PostgreSQL**: A powerful, persistent relational database (Render Managed).
- **JWT (JSON Web Tokens)**: For secure user session management.
- **Multer**: For handling file uploads (profile pictures).
- **ExcelJS & JSPDF**: For generating data exports.

## 📁 Project Structure

```text
ExpenseTracker/
├── frontend/          # React + Vite application
│   ├── src/           # Source code (components, pages, context)
│   ├── public/        # Static assets
│   └── index.html     # Entry point
├── backend/           # Node.js + Express server
│   ├── prisma/        # Database schema and migrations
│   ├── routes/        # API route definitions
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth and upload middlewares
│   └── server.js      # Server entry point
└── README.md          # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- NPM or Yarn.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/expensetracker"
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:5173
   ```
4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).

---
Developed with ❤️ by [Aaditya](https://github.com/aaditya1820)