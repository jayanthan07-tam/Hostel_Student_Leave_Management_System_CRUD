# Hostel Student Leave Management System – CRUD Web Application

A mini full-stack CRUD web application built for **VSB Skill Vault – Activity 3**.

## Features

- Create leave requests
- Read/view all leave requests
- Update leave request details and status
- Delete leave requests
- Search by student name or register number
- Filter by Pending / Approved / Rejected
- Client-side and server-side validation
- REST API using Django REST Framework
- SQLite database
- Responsive React + Vite frontend

## Technology Stack

- Frontend: React + Vite + CSS
- Backend: Python Django + Django REST Framework
- Database: SQLite
- API Testing: Postman
- Version Control: Git / GitHub

## Folder Structure

```text
hostel_leave_crud_skill_vault/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── hostel_leave/
│   └── api/
├── frontend/
│   ├── package.json
│   └── src/
├── POSTMAN_TESTS.md
└── REPORT_TEMPLATE.md
```

## 1. Run Backend

Open terminal inside `backend`:

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

Install packages:

```bash
pip install -r requirements.txt
```

Create database tables:

```bash
python manage.py makemigrations
python manage.py migrate
```

Start backend:

```bash
python manage.py runserver
```

Backend API:

```text
http://127.0.0.1:8000/api/leaves/
```

## 2. Run Frontend

Open another terminal inside `frontend`:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## CRUD API

| Operation | Method | Endpoint |
|---|---|---|
| Create | POST | `/api/leaves/` |
| Read All | GET | `/api/leaves/` |
| Read One | GET | `/api/leaves/{id}/` |
| Update | PUT/PATCH | `/api/leaves/{id}/` |
| Delete | DELETE | `/api/leaves/{id}/` |

## Demo Flow

1. Add a leave request.
2. Show it in the table.
3. Edit the request.
4. Change the status.
5. Search/filter the record.
6. Delete the record.
7. Show API request in Postman.

## Important

This project intentionally stays small and focused so every CRUD operation can be demonstrated reliably.
