import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Layout.css";

function Layout({ children }) {
const [darkMode, setDarkMode] =
useState(false);

const [menuOpen, setMenuOpen] =
useState(false);const toggleDarkMode = () => {
  const newTheme = !darkMode;

  setDarkMode(newTheme);

  document.body.classList.toggle(
    "dark",
    newTheme
  );

  localStorage.setItem(
    "theme",
    newTheme
      ? "dark"
      : "light"
  );
};
useEffect(() => {

  const savedTheme =
    localStorage.getItem(
      "theme"
    );

  if (
    savedTheme === "dark"
  ) {
    setDarkMode(true);
    document.body.classList.add(
      "dark"
    );
  }

}, []);
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="layout">
     <div className="mobile-menu-btn"
  onClick={() =>
    setMenuOpen(!menuOpen)
  }>
  ☰
  </div>
      {/* Sidebar */}
<div
  className={`sidebar ${
    menuOpen ? "open" : ""
  }`}>
        {/* Top Section */}
        <div>
          <h2 className="logo">
            SpendWise AI
          </h2>

          <nav className="nav-menu">

            {token ? (
              <>
                <Link to="/dashboard">
                  Dashboard
                </Link>
                
                <Link to="/profile">
                  Profile
                </Link>
                
                <Link to="/add">
                  Add Expense
                </Link>

                <Link to="/reports">
                  Reports
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  Login
                </Link>

                <Link to="/signup">
                  Signup
                </Link>
              </>
            )}

          </nav>
          <button
  onClick={toggleDarkMode}
  className="theme-btn"
>
  {darkMode
    ? "☀ Light Mode"
    : "🌙 Dark Mode"}
</button>
        </div>

        {/* Logout Button at Bottom */}
       <div className="sidebar-bottom">
  {token && (
    <button
      onClick={handleLogout}
      className="logout-btn"
    >
      Logout
    </button>
  )}
</div>

      </div>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>

    </div>
  );
}

export default Layout;