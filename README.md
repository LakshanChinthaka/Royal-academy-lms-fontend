# Learning Management System (Front-end)

### Used Technology -  Spring boot | React | MySQL | Firebase | AWS RDS & EC2 | TailwindCSS

This project is a comprehensive web application built using Spring Boot, React, and various technologies to provide a robust platform for managing student data, assignments, and educational resources. Here's a brief overview of the key features:

## Features
##### 1.  Authentication and Security: Utilizes Spring Boot JWT for secure role-based authentication (Role - Student and Admin).
##### 2. File and Image Storage: Firebase integration for storing assignment files and profile pictures.
##### 3. Scalable Deployment: Backend deployed on AWS EC2, with the database on AWS RDS, ensuring scalability and reliability.
##### 4. Entity Management: CRUD operations for entities like Student, Course, Batch, etc.
##### 5. Course Enrollment: Allows assigning subjects to courses and enrolling students in courses and batches.
##### 6. Email Integration: Facility to send emails integrated within the system.
##### 7. Data Visualization: Utilizes Pie, Bar, and Line charts to visualize assignment, student, and system data.
##### 8. Admin Dashboard: Real-time display of total students, subjects, schools, assignments, and pass rates
##### 9. Monitoring and Metrics: Tracks 200, 400, 404, 500 HTTP request count, error count, CPU, RAM, and database status using Spring Boot Actuator.
##### 10. Exception Handling: Custom exception handling for better error management.
##### 11. Performance Optimization: Implements pagination to improve API performance.
##### 12. Frontend Interaction: Axios for API data fetch, with state management in React using useState, useEffect, and Context.
##### 13. Responsive Design: All interfaces are designed to be responsive for optimal viewing across devices.

## Getting Started
To get started with our platform, follow these simple steps:
### Frontend Setup
##### 1. Clone this repo.`Royal-academy-lms-fontend`.
##### 2. Install dependencies using `npm install`
##### 3. Run the development server using `npm run dev`.

### Backtend Setup
##### 1. Navigate to the `backend-royal-lms-system` repo and clone it
##### 2. Set up your MySQL database and configure the database connection in `application.properties`.
##### 3. Build the Spring Boot application using your favorite IDE or Maven.
##### 4. Run the application, and the backend server will start on the configured port.


### Database diagram
![@localhost](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/189ab9f8-103f-4d34-bea0-66b69000d305)

### Home Page
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/48670d4d-108d-44c8-b3c2-2c946272593f)

### All Programs and can filter
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/312a690a-adf7-42e7-965d-c8b4cdb19818)

###  Admin Dashboard 01
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/a6ff2a6c-0de4-4ea9-8db3-5d2b49f08e8f)

###  Admin Dashboard 02
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/99c859d4-ef67-41ea-a0cd-bc685620aad6)

### Firebase Folder Structure
![image](https://github.com/LakshanChinthaka/Royal-academy-lms-fontend/assets/115285758/fb7487f2-aa97-4c8e-be89-53754924e40c)

### Student Registration
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/61321109-c842-4c46-a8d2-fac01f1bd775)

### Enroll Student
![image](https://github.com/LakshanChinthaka/Royal-academy-lms-fontend/assets/115285758/c351b62f-238f-410d-8214-6cbf00bb4d2b)

### Courses Information
![image](https://github.com/LakshanChinthaka/Royal-academy-lms-fontend/assets/115285758/08fde196-f903-43c0-97df-3b3dfffb5de2)

### Create Details
![image](https://github.com/LakshanChinthaka/Royal-academy-lms-fontend/assets/115285758/f4441c87-52de-420c-8f18-9d8c20493c65)

### User Profile Page
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/e3474427-3874-447a-9817-3d72c825c677)

### Student Dashboard, Studet can upload assignment 
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/0e08f091-1cae-4b91-8cc6-fd2358547b98)

### Mobile Responsive 
![image](https://github.com/LakshanChinthaka/backend-royal-lms-system/assets/115285758/4e46ef9c-9c60-484f-9d96-54a14e464a4e)



