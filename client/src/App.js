import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";
import EditExpense from "./pages/EditExpense";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="/signup"
        element={
          <Layout>
            <Signup />
          </Layout>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Add Expense */}
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Layout>
              <AddExpense />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Edit Expense */}
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditExpense />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/profile"
  element={<Profile />}
/>

    </Routes>
  );
}

export default App;