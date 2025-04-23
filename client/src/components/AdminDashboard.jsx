import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found in localStorage");
        setError("No token found. Please log in as an admin.");
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/admin/all-predictions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch reports: ${response.statusText}`);
        }

        const data = await response.json();
        setReports(data.predictions);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin"); // Change this to your admin login route
  };

  const goToReports = () => {
    navigate("/admin/dashboard"); // Reload current page
  };

  const goToUsers = () => {
    navigate("/admin/users"); // Assuming you have this route created
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-reports" style={{ padding: "20px" }}>
      {/* Header Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <button
            onClick={goToReports}
            style={{ marginRight: "10px", backgroundColor: "#00bb00" }}
          >
            All Reports
          </button>
          <button onClick={goToUsers} style={{ backgroundColor: "#ffffff" }}>
            All Users
          </button>
        </div>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: "#f44336", color: "#fff" }}
        >
          Logout
        </button>
      </div>

      <h2>Admin: All Prediction Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>S.N.</th>
                <th>Email</th>
                <th>Disease</th>
                <th>Description</th>
                <th>Symptoms</th>
                <th>Precautions</th>
                <th>Medications</th>
                <th>Diets</th>
                <th>Workouts</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="text-nowrap">{report.username}</td>
                  <td>{report.predicted_disease}</td>
                  <td>{report.description}</td>
                  <td>{report.symptoms.join(", ")}</td>
                  <td>{report.precautions.join(", ")}</td>
                  <td>{report.medications.join(", ")}</td>
                  <td>{report.diets.join(", ")}</td>
                  <td>{report.workouts.join(", ")}</td>
                  <td className="text-nowrap">
                    {report.datetime
                      ? new Date(report.datetime.$date).toLocaleString()
                      : "No date"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
