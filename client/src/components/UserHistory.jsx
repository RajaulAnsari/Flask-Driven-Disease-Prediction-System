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
      <section className="container">
        <br />
        <div className="user-history">
          <h2 className="text-center">Your Prediction Reports</h2>
          {reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            reports.map((report, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-primary">Report #{index + 1}</h4>
                <table className="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th>Predicted Disease</th>
                      <td className="fw-bold">{report.predicted_disease}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{report.description}</td>
                    </tr>
                    <tr>
                      <th>Symptoms</th>
                      <td>{report.symptoms.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>Precautions</th>
                      <td>{report.precautions.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>Medications</th>
                      <td>{report.medications.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>Diets</th>
                      <td>{report.diets.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>Workouts</th>
                      <td>{report.workouts.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>
                        {report.datetime
                          ? new Date(report.datetime.$date).toLocaleString()
                          : "No date available"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserHistory;
