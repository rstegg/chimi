import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="header">
      <h1>Meal Planner</h1>
      <nav>
        <Link to="/home">Home</Link>
        {isLoggedIn ? (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
