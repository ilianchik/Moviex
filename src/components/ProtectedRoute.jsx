import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = UserAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/signup" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
