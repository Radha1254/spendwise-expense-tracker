import {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import API from "../services/api";
import "./EditExpense.css";

function EditExpense() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: "",
      paymentMethod: "",
      note: "",
      date: ""
    });

  useEffect(() => {

    const fetchExpense =
    async () => {
      try {

        const res =
        await API.get(
          `/expenses/${id}`
        );

        setFormData(
          res.data
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchExpense();

  }, [id]);

  const handleChange =
  (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    await API.put(
      `/expenses/${id}`,
      formData
    );

    navigate(
      "/dashboard"
    );
  };

  return (
    <div className="edit-page">

      <div className="edit-container">

        <h2>
          Edit Expense
        </h2>

        <form
          className="edit-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={formData.paymentMethod}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={
              formData.date?.split("T")[0]
            }
            onChange={handleChange}
          />

          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="update-btn"
          >
            Update Expense
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditExpense;