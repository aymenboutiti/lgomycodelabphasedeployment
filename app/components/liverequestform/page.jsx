"use client";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";
import { useRouter } from "next/navigation";

const LiveRequestForm = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    subject: "",
    theme: "",
    type: "",
    date: "",
    delay: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert("Please log in to submit a live request.");
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        subject: form.subject,
        theme: form.theme,
        type: form.type,
        date: form.date || null,
        delay: form.delay || null,
      };

      await api.createLiveRequest(requestData);
      
      // Reset form
      setForm({ subject: "", theme: "", type: "", date: "", delay: "" });
      alert("Live session request submitted successfully!");
      
      // Redirect to students page
      router.push("/students");
    } catch (error) {
      console.error('Error submitting live request:', error);
      alert("Error submitting live request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded shadow space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Request a Live Session</h2>
      <div>
        <label className="block font-semibold mb-1">Subject</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Theme</label>
        <input
          type="text"
          name="theme"
          value={form.theme}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Type of Live</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select type</option>
          <option value="course_resume">Course Resume</option>
          <option value="emphasize_exercise">Emphasize Exercise</option>
          <option value="exam_review">Exam Review</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Delay (if no date)</label>
        <input
          type="text"
          name="delay"
          value={form.delay}
          onChange={handleChange}
          placeholder="e.g. 2 days, next week"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default LiveRequestForm;