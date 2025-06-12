import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") navigate("/admin/dashboard");
    else if (user?.role === "faculty") navigate("/faculty/dashboard");
    else if (user?.role === "student") navigate("/student/dashboard");
    else navigate("/login");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
      Redirecting based on your role...
    </div>
  );
};

export default HomePage;
