# MINI WEB APPLICATION – CRUD-BASED WEB APPLICATION

## Project Title
Hostel Student Leave Management System

## 1. Project Overview
The Hostel Student Leave Management System is a web-based mini application used to manage student hostel leave requests digitally. The system allows users to create, view, update, search, filter, and delete leave records.

## 2. Problem Statement
Manual hostel leave records are difficult to maintain, search, update, and verify. A simple digital CRUD application can make the process faster and more organized.

## 3. Objectives
- Digitize hostel leave records.
- Implement Create, Read, Update, and Delete operations.
- Connect frontend and backend using REST APIs.
- Store data permanently in a database.
- Provide validation and error handling.
- Provide search and status filtering.

## 4. Technology Stack
- React + Vite
- CSS
- Django
- Django REST Framework
- SQLite
- Postman
- GitHub

## 5. System Architecture

User → React Frontend → REST API → Django REST Framework → SQLite Database

## 6. Database Entity

### LeaveRequest
- id
- student_name
- register_no
- department
- year
- from_date
- to_date
- reason
- status
- created_at
- updated_at

## 7. CRUD Operations
### Create
A new leave request is added using the form.

### Read
All saved leave requests are displayed in a table.

### Update
Existing request details and status can be edited.

### Delete
A selected leave request can be removed after confirmation.

## 8. Validation
- Required fields cannot be empty.
- Year must be between 1 and 4.
- To date cannot be earlier than from date.
- Status must be Pending, Approved, or Rejected.

## 9. Testing
Test the REST API using Postman for valid input, missing input, invalid IDs, updates, and deletion.

## 10. Challenges and Solutions
Example:
- CORS issue between frontend and backend.
- Solved using django-cors-headers.

## 11. Future Enhancements
- Student login
- Warden login
- Leave approval workflow
- QR/ID-card verification
- Attendance integration
- Email/SMS notifications

## 12. Conclusion
The project demonstrates full-stack CRUD application development using React, Django REST Framework, and SQLite.
