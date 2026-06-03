import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";
import Layout from "../components/Layout";

function Profile() {
  const [profile, setProfile] =
    useState(null);

  const [stats, setStats] =
    useState({
      totalExpenses: 0,
      totalSpent: 0,
      budget: 0
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
  async () => {
    try {
        const token =
localStorage.getItem(
  "token"
);

const userRes = await API.get("/auth/profile",
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
);
const expenseRes = await API.get("/expenses");
const budgetRes = await API.get("/budget"); 
const expenses = expenseRes.data;
const totalSpent = expenses.reduce(
          (acc, curr) =>
            acc + curr.amount,
          0
        );

      setProfile(
        userRes.data
      );

      setStats({
        totalExpenses:
          expenses.length,

        totalSpent,

        budget:
          budgetRes.data
            ?.monthlyBudget || 0
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
     <Layout>
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h2>
          {profile?.name}
        </h2>

        <p>
          {profile?.email}
        </p>

        <div className="profile-stats">

          <div className="stat-box">
            <h3>
              {stats.totalExpenses}
            </h3>
            <p>Expenses</p>
          </div>

          <div className="stat-box">
            <h3>
              ₹{stats.totalSpent}
            </h3>
            <p>Total Spent</p>
          </div>

          <div className="stat-box">
            <h3>
              ₹{stats.budget}
            </h3>
            <p>Budget</p>
          </div>

        </div>

      </div>
    </div>
    </Layout>
  );
}

export default Profile;