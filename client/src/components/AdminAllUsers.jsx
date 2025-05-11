import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAllUsers() {
  // state to store user list
  const [users, setUsers] = useState([]);
  // Loading state while fetching users
  const [loading, setLoading] = useState(true);
  //Error state in case fails fetching
  const [error, setError] = useState(null);

  // React router navigation hook
  const navigate = useNavigate();

  // useEffect to fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      // get admin token
      const token = localStorage.getItem("adminToken");

      // Handle missing token
      if (!token) {
        console.error("No token found in localStorage");
        setError("No token found. Please log in as an admin.");
        return;
      }

      try {
        // Fetch request to backend API to get all users
        const response = await fetch(
          "http://127.0.0.1:5000/api/admin/all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle unsuccessful response
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data.predictions);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        // Stop loading once fetch completes
        setLoading(false);
      }
    };

    fetchUsers(); // Call the async fetch function
  }, []);

  // Function to handle admin logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  // Navigate to reports page
  const goToReports = () => {
    navigate("/admin/dashboard");
  };

  // Navigate to users page
  const goToUsers = () => {
    navigate("/admin/users");
  };

  // Show loading message while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if fetch failed
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render users table
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
          <button
            onClick={goToReports}
            style={{ marginRight: "10px", backgroundColor: "#ffffff" }}
          >
            All Reports
          </button>
          <button onClick={goToUsers} style={{ backgroundColor: "#00bb00" }}>
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

      <h2>Admin: All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle text-center">
            <thead className="table-dark">
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
                  <td className="text-nowrap">{user.name || "N/A"}</td>
                  <td className="text-nowrap">{user.username || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
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

export default AdminAllUsers;
