import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { PROTECT_ROUTES } from "../../../constants";

export const useRedirects = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { role, id } = user || { role: null, id: null };
  const location = useLocation();
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToDoctorPage = (id: string | null) => {
    if (id) {
      navigate(`/${id}`);
    } else {
      navigate("/");
    }
  };

  const redirectToFirstAvailableProtectedRoute = (role: string) => {
    navigate(`/${PROTECT_ROUTES[role][0].path}`);
  };

  useEffect(() => {
    if (!user) return;

    if (role == null) {
      redirectToLogin();
      return;
    }

    if (role === "doctor") {
      if (id) {
        redirectToDoctorPage(id);
        return;
      }

      const lastVisitedPath = localStorage.getItem("lastVisitedPath");
      if (lastVisitedPath) {
        redirectToDoctorPage(null);
      } else {
        localStorage.setItem("lastVisitedPath", location.pathname);
        redirectToDoctorPage(null);
      }
      return;
    }

    const lastVisitedPath = localStorage.getItem("lastVisitedPath");
    if (lastVisitedPath) {
      redirectToFirstAvailableProtectedRoute(role);
    } else {
        localStorage.setItem("lastVisitedPath", location.pathname);
      redirectToFirstAvailableProtectedRoute(role);
    }
  }, [user, location]);
};
