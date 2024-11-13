import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a token in the local storage
    const token = localStorage.getItem("token");

    // If there's no token, redirect to the login page
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
