import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Check if user is logged in
  if (!token) {
    alert("Unauthorized. Please log in.");
    return <Navigate to="/" />;
  }

  // Check if user has the correct role
  if (userRole !== role) {
    alert("Access denied. You do not have permission to view this page.");
    return <Navigate to="/" />;
  }

  // All checks passed – render the child component
  return children;
};

export default ProtectedRoute;
