import { useEffect, useState } from "react";
import { deleteUser, listUsers } from "../../services/User/UserService";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const ListUsers = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(""); // State to track errors
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    console.log("Starting fetchUsers...");
    setLoading(true); // Show loading indicator
    setError(""); // Clear any previous errors
    try {
      const response = await listUsers();
      console.log("Users fetched successfully:", response.data);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  function addNewUser() {
    navigate("/add-user");
  }

  function updateUser(userId) {
    navigate(`/update-user/${userId}`);
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete the user. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">List of Users</h2>

      {/* Conditionally render the Add User button */}
      {!loading && !error && (
        <button className="btn btn-primary mb-3" onClick={addNewUser}>
          Add User
        </button>
      )}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading Indicator */}
      {loading ? (
        <Spinner message="Loading users..." />
      ) : error ? (
        " "
      ) : users.length === 0 ? (
        <p>No users found. Add a new user to get started!</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="d-flex justify-content-evenly flex-column flex-md-row">
                      <button
                        className="btn btn-info mb-2 mb-md-0 mr-md-2"
                        onClick={() => updateUser(user.userId)}
                        aria-label={`Update user ${user.firstName}`}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user.userId)}
                        aria-label={`Delete user ${user.firstName}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
