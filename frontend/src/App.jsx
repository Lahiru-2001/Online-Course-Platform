import { useState } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  const [page, setPage] = useState("login");

  if (page === "register") return <Register onNavigate={setPage} />;
  if (page === "forgot") return <ForgotPassword onNavigate={setPage} />;
  return <Login onNavigate={setPage} />;
}

export default App;
