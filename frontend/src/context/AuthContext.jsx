import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import socket from "../services/socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);
  useEffect(() => {
    if (user && token) {
      socket.connect();

      socket.emit("join", user.id); // change to user._id if needed

      return () => {
        socket.disconnect();
      };
    }
  }, [user, token]);
  // Login
  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    // Connect Socket
    socket.connect();

    socket.emit("join", user.id);
  };
  // Logout
  const logout = () => {
    socket.disconnect();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // Update current user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUser,

        token,
        loading,

        login,
        logout,

        isAuthenticated: !!token,

        role: user?.userType,
        userId: user?.id,
        fullName: user?.fullName,
        email: user?.email,
        status: user?.status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;