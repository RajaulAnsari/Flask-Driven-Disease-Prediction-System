import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function UserHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports data from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const response = await fetch(`http://127.0.0.1:5000/api/reports`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ token: token }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch reports");
        }
        setReports(data.predictions); // Assuming 'predictions' is the array in the response
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div>Loading...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div>Error: {error}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="user-history">
        <h2>Your Prediction Reports</h2>
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          reports.map((report, index) => (
            <div key={index} className="report-item">
              <h3>Predicted Disease: {report.predicted_disease}</h3>
              <p>
                <strong>Description:</strong> {report.description}
              </p>
              <p>
                <strong>Symptoms:</strong> {report.symptoms.join(", ")}
              </p>
              <p>
                <strong>Precautions:</strong> {report.precautions.join(", ")}
              </p>
              <p>
                <strong>Medications:</strong> {report.medications.join(", ")}
              </p>
              <p>
                <strong>Diets:</strong> {report.diets.join(", ")}
              </p>
              <p>
                <strong>Workouts:</strong> {report.workouts.join(", ")}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {report.datetime
                  ? new Date(report.datetime.$date).toUTCString()
                  : "No date available"}
              </p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserHistory;
