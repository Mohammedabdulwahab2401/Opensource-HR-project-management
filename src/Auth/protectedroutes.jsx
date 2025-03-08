import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext"; 
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, role }) => {
  const { user, role: userRole } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

export default ProtectedRoute;
