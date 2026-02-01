import "./Logout.css";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.clear();
    sessionStorage.clear();

   
    navigate("/login");
  };

  return (
    <div className="logout-page">
      <div className="logout-box">
        <h2>Are you sure you want to logout?</h2>

        <div className="logout-actions">
          <button className="logout-confirm" onClick={handleLogout}>Logout</button>

          <button className="logout-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
