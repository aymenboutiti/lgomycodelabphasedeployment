"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../lib/api";

// Dummy data for demonstration (replace with API/database fetch)
const lastCoursesFromTeachers = [
  { id: 1, title: "Algebra Basics", teacher: "Mr. Smith", date: "2025-10-01" },
  { id: 2, title: "Physics: Motion", teacher: "Ms. Lee", date: "2025-09-28" },
];

const liveRequestsFromLevel = [
  { id: 1, subject: "Math", theme: "Functions", type: "exam_review", date: "2025-10-10", student: "Alice" },
  { id: 2, subject: "Physics", theme: "Kinematics", type: "course_resume", date: "2025-10-12", student: "Bob" },
];

export default function StudentSpace() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState({});
  const [coursesDone, setCoursesDone] = useState([]);
  const [coursesInWork, setCoursesInWork] = useState([]);
  const [myLiveRequests, setMyLiveRequests] = useState([]);
  const [lastCoursesFromTeachers, setLastCoursesFromTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadStudentData();
    }
  }, [isAuthenticated, user]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      
      // Get student profile
      const profileData = await api.getProfile();
      setProfile(profileData.profile || {});

      // Get student courses
      const courses = await api.getStudentCourses(user.id);
      setCoursesDone(courses.filter(course => course.status === 'completed'));
      setCoursesInWork(courses.filter(course => course.status === 'in_progress'));

      // Get student live requests
      const liveRequests = await api.getStudentLiveRequests(user.id);
      setMyLiveRequests(liveRequests);

      // Get recent courses from teachers
      const recentCourses = await api.getCourses({ limit: 5 });
      setLastCoursesFromTeachers(recentCourses);

    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your student space</h1>
          <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Go to Login
          </Link>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Top bar with student name */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <span className="text-lg font-semibold text-blue-700">
          {profile.name ? `Welcome, ${profile.name}` : "Welcome, Student"}
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
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Profile Section */}
        <section className="md:col-span-1 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
            Profile
          </h2>
          <div className="space-y-2 text-gray-700">
            <div><span className="font-semibold">Name:</span> {profile.name || "N/A"}</div>
            <div><span className="font-semibold">Email:</span> {profile.email || "N/A"}</div>
            <div><span className="font-semibold">Level:</span> {profile.level || "N/A"}</div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-3 text-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19h16M4 15h16M4 11h16M4 7h16"/></svg>
              Courses Done
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {coursesDone.length > 0 ? (
                coursesDone.map((course, idx) => (
                  <li key={idx}>{course.title}</li>
                ))
              ) : (
                <li>No courses completed yet.</li>
              )}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-3 text-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2"/></svg>
              Courses In Work
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {coursesInWork.length > 0 ? (
                coursesInWork.map((course, idx) => (
                  <li key={idx}>{course.title}</li>
                ))
              ) : (
                <li>No courses in progress.</li>
              )}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-3 text-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4-4 4 4M12 12V3"/></svg>
              Last Courses Submitted by Teachers
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {lastCoursesFromTeachers.map(course => (
                <li key={course.id}>
                  <span className="font-semibold">{course.title}</span> by {course.teacher} <span className="text-xs text-gray-400">({course.date})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Live Requests Section */}
        <section className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col items-end">
            <Link
              href="/components/liverequestform"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-colors duration-200 shadow"
            >
              Launch Live Request
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-lg font-bold mb-3 text-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              My Live Requests
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {myLiveRequests.length > 0 ? (
                myLiveRequests.map((req, idx) => (
                  <li key={idx}>
                    {req.subject} - {req.theme} ({req.type}) {req.date && `on ${req.date}`}
                  </li>
                ))
              ) : (
                <li>No live requests submitted.</li>
              )}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-lg font-bold mb-3 text-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 4a4 4 0 110 8 4 4 0 010-8z"/></svg>
              Live Requests by Other Students
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {liveRequestsFromLevel.map(req => (
                <li key={req.id}>
                  <span className="font-semibold">{req.subject}</span> - {req.theme} ({req.type}) by {req.student} {req.date && `on ${req.date}`}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}