import "./ViewComplaint.css";
import { Link } from "react-router-dom";
export default function ViewComplaint() {
  return (
    <div className="layout">

  
      {/* MAIN CONTENT */}
      <main className="content">

        <h1 className="page-title">Dashboard Overview</h1>

        {/* CARD BOX */}
        <div className="complaint-card">

          {/* Top Row (ID + Name) */}
          <div className="info-row">
            <p className="info-text">SR/C ID : - 1</p>
            <p className="info-text">Name : - ABV</p>
          </div>

          {/* Complaint and Response */}
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

          {/* Submit Button */}
          <div className="submit-container">
            <button className="submit-btn">Submit</button>
          </div>

        </div>
      </main>
    </div>
  );
}
