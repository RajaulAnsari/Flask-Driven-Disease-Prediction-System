// src/components/AdminUsers.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found in localStorage");
        setError("No token found. Please log in as an admin.");
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/admin/all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Optional
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data.predictions);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const goToReports = () => {
    navigate("/admin/dashboard");
  };

  const goToUsers = () => {
    navigate("/admin/users");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-users" style={{ padding: "20px" }}>
      {/* Header Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <button onClick={goToReports} style={{ marginRight: "10px" }}>
            All Reports
          </button>
          <button onClick={goToUsers}>All Users</button>
        </div>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: "#f44336", color: "#fff" }}
        >
          Logout
        </button>
      </div>

      <h2>Admin: All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.username || "N/A"}</td>
                  <td>{user.role || "user"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminAllUsers;
