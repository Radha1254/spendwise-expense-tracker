# 💰 SpendWise – Expense Tracker

SpendWise is a full-stack MERN Expense Tracker application that helps users manage expenses, track budgets, and analyze spending patterns in a clean dashboard.

The project includes authentication, budget management, expense tracking, reports, charts, filtering, dark mode, and responsive UI.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based Authentication
* Protected Routes
* Secure Password Hashing using bcrypt

### 💸 Expense Management

* Add Expenses
* Edit Expenses
* Delete Expenses
* Categorized Expenses (Food, Travel, Shopping, College, etc.)
* Expense Notes & Date Tracking

### 📊 Dashboard & Analytics

* Total Spending Overview
* Budget Tracking
* Remaining Budget Calculation
* Progress Bar for Budget Usage
* Expense Summary Cards
* Charts & Reports

### 🔍 Search & Filter

* Search Expenses
* Category Filtering
* Sort by:

  * Latest
  * Oldest
  * Highest Amount
  * Lowest Amount

### 👤 Profile Page

* User Information
* Expense Statistics
* Total Spending
* Budget Summary

### 🎨 UI Features

* Responsive Design
* Sidebar Navigation
* Mobile Menu
* Dark Mode / Light Mode

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Deployment

* Render (Frontend + Backend)

---

## 📂 Project Structure

```bash
SpendWise/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│
├── expense-tracker-backend/ # Node.js Backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Radha1254/spendwise-expense-tracker.git
cd spendwise-expense-tracker
```

### 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../expense-tracker-backend
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env` file inside `expense-tracker-backend/`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### 5️⃣ Run Backend

```bash
npm start
```

### 6️⃣ Run Frontend

```bash
cd client
npm start
```

---

## 📌 Future Improvements

* AI Spending Suggestions
* Monthly Expense Prediction
* Export Reports (PDF/Excel)
* Expense Notifications
* Income Tracking

---

## 👨‍💻 Author

**Radha Jadon**

GitHub: https://github.com/Radha1254
