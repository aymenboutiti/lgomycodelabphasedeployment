"use client";
import React, { useState, useEffect } from "react";
import Footer from "../components/footer/page";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../lib/api";

// Dummy data for demonstration
const dummyLiveRequests = [
  { id: 1, subject: "Math", theme: "Functions", type: "exam_review", date: "2025-10-10", student: "Alice" },
  { id: 2, subject: "Physics", theme: "Kinematics", type: "course_resume", date: "2025-10-12", student: "Bob" },
];

export default function TeacherSpace() {
  const { user, isAuthenticated } = useAuth();
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    level: "",
    type: "",
    videoLink: "",
    pdfFile: null,
  });
  const [uploadedCourses, setUploadedCourses] = useState([]);
  const [liveRequests, setLiveRequests] = useState([]);
  const [acceptText, setAcceptText] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadTeacherData();
    }
  }, [isAuthenticated, user]);

  const loadTeacherData = async () => {
    try {
      setLoading(true);
      
      // Get teacher profile first
      const profileData = await api.getProfile();
      console.log('Profile data:', profileData);
      
      // Get teacher courses (only if we have a valid teacher ID)
      if (profileData.profile && profileData.profile._id) {
        const courses = await api.getTeacherCourses(profileData.profile._id);
        setUploadedCourses(courses);
      } else {
        console.log('No teacher profile found, using user ID');
        const courses = await api.getTeacherCourses(user.id);
        setUploadedCourses(courses);
      }

      // Get live requests
      const requests = await api.getLiveRequestsForTeacher();
      setLiveRequests(requests);

    } catch (error) {
      console.error('Error loading teacher data:', error);
      // Set empty arrays on error
      setUploadedCourses([]);
      setLiveRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdfFile") {
      setCourseForm({ ...courseForm, pdfFile: files[0] });
    } else {
      setCourseForm({ ...courseForm, [name]: value });
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Get teacher profile to get the correct teacher ID
      const profileData = await api.getProfile();
      const teacherId = profileData.profile ? profileData.profile._id : user.id;

      const courseData = {
        title: courseForm.title,
        description: courseForm.description || courseForm.title,
        level: courseForm.level,
        type: courseForm.type,
        teacher: teacherId,
      };

      console.log('Frontend - Course form data:', courseForm);
      console.log('Frontend - User data:', user);
      console.log('Frontend - Profile data:', profileData);
      console.log('Frontend - Teacher ID being used:', teacherId);
      console.log('Frontend - Course data being sent:', courseData);

      if (courseForm.type === "video") {
        courseData.videoLink = courseForm.videoLink;
      } else if (courseForm.type === "pdf" && courseForm.pdfFile) {
        courseData.pdfFile = courseForm.pdfFile;
      }

      await api.createCourse(courseData);
      
      // Reload courses
      await loadTeacherData();
      
      setCourseForm({ title: "", description: "", level: "", type: "", videoLink: "", pdfFile: null });
      alert("Course uploaded successfully!");
    } catch (error) {
      console.error('Error creating course:', error);
      alert("Error uploading course. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await api.acceptLiveRequest(id, acceptText[id] || "");
      alert(`Live request ${id} accepted successfully!`);
      setAcceptText({ ...acceptText, [id]: "" });
      // Reload live requests
      await loadTeacherData();
    } catch (error) {
      console.error('Error accepting live request:', error);
      alert("Error accepting live request. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your teacher space</h1>
          <a href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow">
        <span className="text-2xl font-bold text-blue-700">Edu Platform</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-blue-700 font-semibold text-lg">
            Teacher
            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
            </svg>
          </span>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/auth/login';
            }}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Course Form */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 md:col-span-1">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Introduce a Course</h2>
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                value={courseForm.title}
                onChange={handleCourseChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={courseForm.description}
                onChange={handleCourseChange}
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Class Level</label>
              <input
                type="text"
                name="level"
                value={courseForm.level}
                onChange={handleCourseChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Type</label>
              <select
                name="type"
                value={courseForm.type}
                onChange={handleCourseChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select type</option>
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            {courseForm.type === "video" && (
              <div>
                <label className="block font-semibold mb-1">Video Link</label>
                <input
                  type="url"
                  name="videoLink"
                  value={courseForm.videoLink}
                  onChange={handleCourseChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}
            {courseForm.type === "pdf" && (
              <div>
                <label className="block font-semibold mb-1">Upload PDF</label>
                <input
                  type="file"
                  name="pdfFile"
                  accept="application/pdf"
                  onChange={handleCourseChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
                {courseForm.pdfFile && (
                  <div className="text-sm text-gray-500 mt-1">Selected: {courseForm.pdfFile.name}</div>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-blue-400"
            >
              {submitting ? 'Submitting...' : 'Submit Course'}
            </button>
          </form>
        </section>

        {/* Section 2: Uploaded Courses */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 md:col-span-1">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Your Uploaded Courses</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {uploadedCourses.length > 0 ? (
              uploadedCourses.map((course, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{course.name}</span> ({course.level}) - {course.type}
                  {course.type === "video" && (
                    <span> | <a href={course.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video Link</a></span>
                  )}
                  {course.type === "pdf" && (
                    <span> | PDF: {course.pdfFileName}</span>
                  )}
                </li>
              ))
            ) : (
              <li>No courses uploaded yet.</li>
            )}
          </ul>
        </section>

        {/* Section 3: Live Requests from Students */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 md:col-span-1">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Live Requests from Students</h2>
          <ul className="space-y-4">
            {liveRequests.length > 0 ? (
              liveRequests.map((req) => (
                <li key={req.id} className="border-b pb-3">
                  <div>
                    <span className="font-semibold">{req.subject}</span> - {req.theme} ({req.type}) by {req.student} {req.date && `on ${req.date}`}
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Your response..."
                      value={acceptText[req.id] || ""}
                      onChange={e => setAcceptText({ ...acceptText, [req.id]: e.target.value })}
                      className="border rounded px-3 py-1"
                    />
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Accept & Submit
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No live requests submitted by students.</li>
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}