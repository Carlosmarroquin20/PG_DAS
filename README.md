# PG_DAS: Agricultural Products Ordering Platform

![Project Banner](https://via.placeholder.com/1200x400?text=PG_DAS+%7C+Agricultural+Products+Ordering+System)

## Description 📋
**PG_DAS** is a complete agricultural product ordering platform developed with the **MERN** stack (**MongoDB**, **Express.js**, **React**, and **Node.js**). It allows users to browse agricultural product categories such as fertilizers, foliar products, and fungicides, add them to a cart, calculate crop recommendations, and place orders. It also includes an admin panel for product management and analytics.

The platform does not process payments but facilitates an intuitive system for managing product orders.

## Features 🌟
- **Frontend**:
   - User-friendly interface built with React.
   - Login and Registration with JWT-based authentication.
   - Product listing categorized into:
     - Fertilizers
     - Foliar Products
     - Fungicides
   - **Agricultural Calculator**:
     - Input land size (m²).
     - Select crop type.
     - Receive tailored crop recommendations.
   - Shopping cart functionality for creating orders.

- **Admin Panel**:
   - Add, edit, delete, and manage product inventory.
   - View product statistics and manage orders.

- **Backend**:
   - RESTful API built with Node.js and Express.
   - MongoDB for database management.
   - Secure routes protected with **JSON Web Tokens (JWT)**.
   - Cloudinary integration for image storage.

## Demo 🚀
The live demo of the application can be accessed here:
👉 [PG_DAS Live](https://pg-das-frontend.onrender.com/)

![Project Screenshot](https://via.placeholder.com/600x400?text=Project+Screenshot)

---

## Table of Contents 📚
1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Screenshots](#screenshots)
7. [Contributions](#contributions)
8. [License](#license)

---

## Technologies Used 🛠️
- **Frontend**:
   - React.js
   - Axios
   - React Router DOM
   - SweetAlert2
- **Backend**:
   - Node.js
   - Express.js
   - MongoDB with Mongoose
   - JWT (JSON Web Token) for authentication
   - Multer & Cloudinary for file uploads
- **Tools & Other**:
   - Nodemon
   - Jest for testing

---

## Installation 🧑‍💻
Follow these steps to run the project locally:

### 1. Clone the Repository:
```bash
git clone https://github.com/Carlosmarroquin20/PG_DAS.git
cd PG_DAS
```

### 2. Install Dependencies:
- **Backend**:
```bash
cd backend
npm install
```
- **Frontend**:
```bash
cd frontend
npm install
```
- **Admin**:
```bash
cd admin
npm install
```

### 3. Start the Application:
Run the backend and frontend simultaneously:

- **Backend**:
```bash
npm run dev
```
- **Frontend & Admin**:
```bash
npm start
```

The application will be available on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

---

## Environment Variables ⚙️
Create a `.env` file in the **backend** directory with the following variables:
```env
PORT=5000
MONGODB_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

---

## Project Structure 🗂️
```
PG_DAS/
│
├── admin/            # React-based Admin Panel
│   ├── public/
│   ├── src/
│
├── backend/          # Node.js/Express Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│
├── frontend/         # React Frontend for Users
│   ├── public/
│   ├── src/
│
└── .github/          # GitHub Actions and workflows
```

---

## Screenshots 🖼️
### 1. Landing Page
![Landing Page](https://via.placeholder.com/600x400?text=Landing+Page)

### 2. Product Categories
![Product Categories](https://via.placeholder.com/600x400?text=Product+Categories)

### 3. Shopping Cart
![Shopping Cart](https://via.placeholder.com/600x400?text=Shopping+Cart)

### 4. Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/600x400?text=Admin+Dashboard)

---

## Contributions 🤝
Contributions are welcome! Follow these steps to contribute:
1. Fork the project.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

---

## License 📄
This project is licensed under the **MIT License**.

---

## Author ✍️
Developed by **Carlos Marroquín**.

📧 [Contact Me](mailto:your-email@example.com)

---

_This README was auto-generated for the PG_DAS project._
