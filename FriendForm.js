import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FriendForm = ({ onAddFriend, friend = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    textarea: "",
    number: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEdit) setFormData(friend);
  }, [friend, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.textarea || !formData.number) {
      setError("All fields are required");
      setSuccess("");
      return;
    }
    const newFriend = {
      id: isEdit ? friend.id : uuidv4(),
      ...formData,
    };
    onAddFriend(newFriend);
    setError("");
    setSuccess(isEdit ? "Friend updated successfully!" : "Friend added successfully!");
    if (!isEdit) {
      setFormData({ name: "", dob: "", textarea: "", number: "" });
    }
  };

  const handleReset = () => {
    setFormData({ name: "", dob: "", textarea: "", number: "" });
    setError("");
    setSuccess("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
    >
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="textarea"
        placeholder="Description"
        value={formData.textarea}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="number"
        placeholder="Number"
        value={formData.number}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between  items-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          {isEdit ? "Update Friend" : "Add Friend"}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FriendForm;
