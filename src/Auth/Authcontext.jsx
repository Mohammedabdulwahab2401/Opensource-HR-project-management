import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config"; 
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types"; // ✅ Added PropTypes validation

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setRole(user.email === "admin@example.com" ? "admin" : "employee");
      } else {
        setUser(null);
        setRole("guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // ✅ Added prop validation
};

export const useAuth = () => useContext(AuthContext);
