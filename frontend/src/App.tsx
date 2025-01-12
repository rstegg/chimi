import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Header from "./components/Header";
import MealPlanCalendar from "./components/MealPlanCalendar";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Header />
      <Routes>
        {/* Redirect "/" to either /home or /login */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />

        {/* Protected route for /home */}
        <Route
          path="/home"
          element={isLoggedIn ? <MealPlanCalendar /> : <Navigate to="/login" />}
        />

        {/* Login and Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
