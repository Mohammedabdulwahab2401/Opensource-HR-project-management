import { useAuth } from "../Auth/Authcontext";
import { logout } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTasks, FaClock, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import "../Pages/Employee.css"; 

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ completed: 5, pending: 3 }); // Mocked Task Data
  const [attendance, setAttendance] = useState("Not Checked In");
  const [meetings, setMeetings] = useState(["Project Review - 10:00 AM", "Team Sync - 3:00 PM"]); // Mocked Meetings

  useEffect(() => {
    // Fetch user tasks, attendance, and meetings (To be integrated with DB)
  }, []);

  const handleCheckIn = () => setAttendance("Checked In ✅");
  const handleCheckOut = () => setAttendance("Checked Out ⏳");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Employee Panel</h2>
        <ul>
          <li><FaTasks /> My Tasks</li>
          <li><FaClock /> Attendance</li>
          <li><FaCalendarAlt /> Meetings</li>
          <li onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Logout</li>
        </ul>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        <h2>Welcome, {user?.email.split("@")[0]}!</h2>

        {/* Task Section */}
        <div className="dashboard-card">
          <h3>Task Summary</h3>
          <p>Completed: <strong>{tasks.completed}</strong></p>
          <p>Pending: <strong>{tasks.pending}</strong></p>
        </div>

        {/* Attendance Section */}
        <div className="dashboard-card">
          <h3>Attendance</h3>
          <p>Status: <strong>{attendance}</strong></p>
          <button className="check-btn" onClick={handleCheckIn}>Check In</button>
          <button className="check-btn" onClick={handleCheckOut}>Check Out</button>
        </div>

        {/* Meetings Section */}
        <div className="dashboard-card">
          <h3>Upcoming Meetings</h3>
          {meetings.length ? meetings.map((m, i) => <p key={i}>📅 {m}</p>) : <p>No meetings scheduled.</p>}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
