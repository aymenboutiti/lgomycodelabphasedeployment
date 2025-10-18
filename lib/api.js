const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email, password, role) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Student endpoints
  async getStudents() {
    return this.request('/students');
  }

  async getStudentById(id) {
    return this.request(`/students/${id}`);
  }

  async getStudentCourses(id) {
    return this.request(`/students/${id}/courses`);
  }

  async getStudentLiveRequests(id) {
    return this.request(`/students/${id}/live-requests`);
  }

  // Teacher endpoints
  async getTeachers() {
    return this.request('/teachers');
  }

  async getTeacherById(id) {
    return this.request(`/teachers/${id}`);
  }

  async getTeacherCourses(id) {
    return this.request(`/teachers/${id}/courses`);
  }

  async getLiveRequestsForTeacher() {
    return this.request('/teachers/live-requests');
  }

  async acceptLiveRequest(requestId, teacherResponse) {
    return this.request(`/teachers/live-requests/${requestId}/accept`, {
      method: 'POST',
      body: JSON.stringify({ teacherResponse }),
    });
  }

  // Course endpoints
  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/courses${queryParams ? `?${queryParams}` : ''}`);
  }

  async getCourseById(id) {
    return this.request(`/courses/${id}`);
  }

  async createCourse(courseData) {
    // For video courses, send as JSON. For PDF courses, use FormData
    if (courseData.type === 'video') {
      return this.request('/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
        },
        body: JSON.stringify(courseData),
      });
    } else {
      // For PDF courses, use FormData
      const formData = new FormData();
      
      Object.keys(courseData).forEach(key => {
        if (courseData[key] !== null && courseData[key] !== undefined) {
          formData.append(key, courseData[key]);
        }
      });

      return this.request('/courses', {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData, let browser set it
          ...(localStorage.getItem('token') && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
        },
        body: formData,
      });
    }
  }

  async updateCourse(id, courseData) {
    return this.request(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id) {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  async enrollStudent(courseId, studentId) {
    return this.request(`/courses/${courseId}/enroll/${studentId}`, {
      method: 'POST',
    });
  }

  async rateCourse(courseId, rating) {
    return this.request(`/courses/${courseId}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    });
  }

  // Live Request endpoints
  async getLiveRequests() {
    return this.request('/live-requests');
  }

  async getLiveRequestById(id) {
    return this.request(`/live-requests/${id}`);
  }

  async createLiveRequest(liveRequestData) {
    return this.request('/live-requests', {
      method: 'POST',
      body: JSON.stringify(liveRequestData),
    });
  }

  async updateLiveRequest(id, liveRequestData) {
    return this.request(`/live-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(liveRequestData),
    });
  }

  async deleteLiveRequest(id) {
    return this.request(`/live-requests/${id}`, {
      method: 'DELETE',
    });
  }

  async acceptLiveRequest(requestId, teacherResponse) {
    return this.request(`/live-requests/${requestId}/accept`, {
      method: 'POST',
      body: JSON.stringify({ teacherResponse }),
    });
  }

  async rejectLiveRequest(requestId, teacherResponse) {
    return this.request(`/live-requests/${requestId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ teacherResponse }),
    });
  }

  async getLiveRequestsByStudent(studentId) {
    return this.request(`/live-requests/student/${studentId}`);
  }

  async getPendingLiveRequests() {
    return this.request('/live-requests/pending');
  }
}

export default new ApiService();
