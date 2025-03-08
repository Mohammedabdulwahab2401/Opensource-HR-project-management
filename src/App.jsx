import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import { AuthProvider } from "./Auth/Authcontext";
import ProtectedRoute from "./Auth/protectedroutes";
import AdminDashboard from "./Pages/admin";
import EmployeeDashboard from "./Pages/employee";
import EmployeeList from "./Config/Employeelist"; // ✅ Ensure correct import path
import AddEmployee from "./Config/Addemployee";
import GoogleMapComponent from "./Google/GoogleMapComponent"; // ✅ Added Google Maps
import "./App.css"; // ✅ Ensure this file exists

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute role="employee">
                <>
                  <EmployeeDashboard />
                  <GoogleMapComponent />  {/* ✅ Employee sees their check-in location */}
                </>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <>
                  <AdminDashboard />
                  <EmployeeList />
                  <AddEmployee />
                  <GoogleMapComponent />  {/* ✅ Admin sees all employees on map */}
                </>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
