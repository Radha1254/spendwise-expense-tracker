import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AddExpense() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    note: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
if (
    !form.title ||
    !form.amount ||
    !form.category ||
    !form.paymentMethod
  ) {
    alert("Please fill all required fields");
    return;
  }
if (form.amount <= 0) {
  alert("Amount must be greater than 0");
  return;
}
  // Date required
  if (!form.date) {
    alert("Please select a date");
    return;
  }
  // Date validation
  const selectedDate =
    new Date(form.date);

  const currentYear =
    new Date().getFullYear();

  if (
    selectedDate.getFullYear() <
      currentYear - 1 ||
    selectedDate.getFullYear() >
      currentYear + 1
  ) {
    alert(
      "Please enter a valid date"
    );
    return;
  }

  try {

    // API CALL
    const res =
      await API.post(
        "/expenses",
        form
      );

    if (res.data.message) {
      alert(
        res.data.message
      );
    }

    // Reset Form
    setForm({
      title: "",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "",
      note: ""
    });

  } catch (err) {
    console.log(err);
    alert(
      "Error adding expense"
    );
  }
};

    

  return (
   <div>

      {/* PAGE */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >

        {/* CARD */}
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >

          {/* TITLE */}
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "30px",
              color: "#111827"
            }}
          >
            Add Expense
          </h2>

          <form onSubmit={handleSubmit}>

            {/* TITLE FIELD */}
            <div style={{ marginBottom: "20px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151"
                }}
              >
                Title
              </label>

              <input
                type="text"
                placeholder="Lunch with friends"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "16px"
                }}
              />
            </div>

   {/* AMOUNT + CATEGORY */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px"
  }}
>

              {/* AMOUNT */}
              <div style={{ 
                flex: 1,
                marginRight: "10px"
                }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Amount
                </label>

                <input
                  type="number"
                  placeholder="₹500"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount: Number(e.target.value)
                    })
                  }
                  style={{
                    width: "95%",
                    padding: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "16px"
                  }}
                />
              </div>

              {/* CATEGORY */}
              <div style={{ flex: 1 }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "16px"
                  }}
                >
                  <option value="">Select Category</option>

                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Recharge</option>
                  <option>Entertainment</option>
                  <option>College</option>
                  <option>Health</option>
                  <option>Other</option>
                </select>
              </div>

            </div>

            {/* PAYMENT + DATE */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px"
  }}
>

              {/* PAYMENT */}
              <div style={{ flex: 1 }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Payment Method
                </label>

                <select
                  value={form.paymentMethod}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      paymentMethod: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "16px"
                  }}
                >
                  <option value="">Select Payment</option>

                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Debit Card</option>
                  <option>Credit Card</option>
                </select>
              </div>

              {/* DATE */}
         <div
        style={{
       flex: "1 1 300px"
      }}
       >
              <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Date
                </label>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "16px"
                  }}
                />
              </div>

            </div>

            {/* NOTE */}
            <div style={{ marginBottom: "25px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151"
                }}
              >
                Note
              </label>

              <textarea
                rows="4"
                placeholder="Write some details..."
                value={form.note}
                onChange={(e) =>
                  setForm({
                    ...form,
                    note: e.target.value
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "16px"
                }}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Add Expense
            </button>

          </form>
        </div>
      </div>
      </div>
  );
}

export default AddExpense;