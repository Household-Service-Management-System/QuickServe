import "./ViewComplaint.css";
import { Link } from "react-router-dom";
export default function ViewComplaint() {
  return (
    <div className="layout">

  
      
      <main className="content">

        <h1 className="page-title">Dashboard Overview</h1>

        
        <div className="complaint-card">

          
          <div className="info-row">
            <p className="info-text">SR/C ID : - 1</p>
            <p className="info-text">Name : - ABV</p>
          </div>

          
          <div className="two-box-row">

            <div className="box">
              <label className="label">Complaint :</label>
              <textarea className="textarea"></textarea>
            </div>

            <div className="box">
              <label className="label">Response :</label>
              <textarea className="textarea"></textarea>
            </div>

          </div>

         
          <div className="submit-container">
            <button className="submit-btn">Submit</button>
          </div>

        </div>
      </main>
    </div>
  );
}
