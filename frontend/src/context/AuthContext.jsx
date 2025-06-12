import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded); // ✅ full object, not just role
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded); // ✅ full object
    setLoading(false);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null); // ✅ null, not "guest"
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
