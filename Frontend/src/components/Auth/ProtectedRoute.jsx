import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ADMIN_EMAIL } from "../../context/authConstants";

export function ProtectedRoute({ requireAdmin = false }) {
  const { isAuthenticated, isAdmin, adminSessionStatus } = useAuth();

  if (requireAdmin) {
    if (adminSessionStatus === "checking") {
      return <div role="status" className="auth-page">Checking admin access...</div>;
    }
    if (adminSessionStatus === "unavailable") {
      return (
        <div role="alert" className="auth-page">
          Admin authentication is unavailable. Start the backend service and refresh this page.
        </div>
      );
    }
    if (!isAdmin) {
      return <Navigate to="/login" replace />;
    }
  }
  else if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function UnauthenticatedOnlyRoute() {
  const { isAuthenticated, user, adminSessionStatus } = useAuth();

  if (adminSessionStatus === "checking") {
    return <div role="status" className="auth-page">Checking your session...</div>;
  }
  if (isAuthenticated) {
    return <Navigate to={user?.role === "ADMIN" ? "/admin/media-notes" : "/dashboard"} replace />;
  }

  return <Outlet />;
}
