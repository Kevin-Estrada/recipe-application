import { useEffect, useState } from "react";
import { addUser, getUser, updateUser } from "../../services/User/UserService";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";

const User = () => {
  // State variables for form fields and errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error messages

  const { userId } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((response) => {
          const user = response.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setUserName(user.userName);
          setEmail(user.email);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [userId]);

  // Handler for changing simple input fields (title, description)
  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    setErrors((prev) => ({
      ...prev,
      [field]: event.target.value ? "" : `${field} is required`,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      firstName: firstName ? "" : "First Name is required",
      lastName: lastName ? "" : "Last Name is required",
      userName: userName ? "" : "Username is required",
      email: email ? "" : "Email is required",
    };
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.values(newErrors).every((error) => !error)) {
      const user = {
        firstName,
        lastName,
        userName,
        email,
      };
      setLoading(true); // Set loading to true
      setError(""); // Reset error message

      try {
        if (userId) {
          await updateUser(userId, user); // Update the user
          console.log("User updated successfully");
        } else {
          await addUser(user); // Add the recipe
          console.log("User added successfully");
        }
        navigator("/users"); // Navigate back to the list of users
      } catch (err) {
        console.error("Error submitting recipe:", err);
        setError("Failed to submit the user. Please try again.");
      } finally {
        setLoading(false); // Hide the spinner
      }
    }
  };

  function pageTitle() {
    if (userId) {
      return <h1 className="text-center">Update User</h1>;
    } else {
      return <h1 className="text-center">Add User</h1>;
    }
  }

  return (
    <div className="container mt-4">
      {pageTitle()}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading Spinner */}
      {loading ? (
        <Spinner message="Submitting user..." />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* First Name Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>First Name</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={handleChange(setFirstName, "firstName")}
                />
                {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>
            </div>
          </div>

          {/* Last Name Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Last Name</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={handleChange(setLastName, "lastName")}
                />
                {errors.lastName && (
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>
            </div>
          </div>

          {/* Username Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Username</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={userName}
                  onChange={handleChange(setUserName, "userName")}
                />
                {errors.userName && (
                  <div className="text-danger">{errors.userName}</div>
                )}
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Email</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={handleChange(setEmail, "email")}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success">
            Save User
          </button>
        </form>
      )}
    </div>
  );
};

export default User;
