# React Todo List App

A simple yet powerful **Todo List application** built with **React** and a **JSON Server backend**.  
The app supports **CRUD operations**, **bulk deletion**, **sorting**, **filtering**, and **pagination**, with clear **visual states** for expired vs pending tasks.

---

## Overview

This project demonstrates a maintainable, testable, and accessible single-page React app for task management.  
It’s designed to highlight **React best practices**, **RESTful integration**, and **modern UI/UX** principles.

---

## Features

- **CRUD Operations** – Create, Read, Update, Delete tasks
- **Bulk Delete** – Select and delete multiple tasks at once
- **Sorting** – Sort by title, add date, or expiry date (asc/desc)
- **Filtering** – Filter by all / expired / pending tasks
- **Search** – Client-side search by title or description
- **Pagination** – Efficiently view large lists of tasks
- **Visual States** –
  - Expired tasks shown in red
  - Pending tasks shown in green
- **Responsive UI** – Works on desktop and mobile
- **Accessibility** – Keyboard-friendly and ARIA-labeled forms
- **Form Validation** – Ensures title and expiry date are required

---

## Tech Stack

- **Frontend:** React (Vite or CRA)
- **UI Library:** Tailwind CSS
- **Table Management:** TanStack Table
- **Backend:** JSON Server
- **HTTP Client:** Axios

---

## Install Dependencies

- npm install

---

## Start the JSON Server

- npx json-server --watch data/db.json --port 8000

---

## Start the React App

- npm run dev
