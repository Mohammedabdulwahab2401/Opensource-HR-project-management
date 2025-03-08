import { useAuth } from "../Auth/Authcontext";
import { logout } from "../config";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <p>Welcome, <strong>{user?.email}</strong></p>
      <div className="dashboard-content">
        <button className="dashboard-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
