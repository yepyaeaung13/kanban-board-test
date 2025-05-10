# Kanban Board Test

A mini Kanban Task Management App built as a code test using **React**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

---

## 🚀 Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yepyaeaung13/kanban-board-test.git
   cd kanban-board-test

2. **Install dependencies**
  ```npm install

3. **Start development server**
  ```npm run dev

## ✅ Features Implemented
- Create, edit, and delete tasks
- Drag & drop tasks between columns
- Filter tasks by due date (with calendar picker)
- Persist tasks to localStorage
- Responsive layout with scrollable task columns
- ShadCN UI components and Tailwind CSS styling

## 🧠 Assumptions Made
- Tasks are stored in localStorage only (no backend)
- Filtering by due date works per column
- The task board includes 3 main statuses: Todo, In Progress, and Done
- Calendar opens from the filter dropdown to select due date

## 🛠 Tech Stack
- React + TypeScript
- Tailwind CSS
- Zustand (State Management)
- Dnd-kit (Drag and Drop)
- Shadcn/ui (Date Picker & Components)

## 📁 Folder Structure Overview

src/
├── components/      # TaskCard, TaskColumn, DatePicker, etc.
├── store/           # Zustand store for tasks
├── types/           # Task type definition
├── utils/           # Utility functions
└── App.tsx

## 🧪 Build & Run
  ```npm install
     npm run dev

## 🔗 Live Demo

Check out the live demo: [kanban-board-test](https://kanban-board-test-eight.vercel.app/)