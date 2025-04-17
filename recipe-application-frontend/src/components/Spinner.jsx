import "../Spinner.css"; // Import the CSS for the spinner

// eslint-disable-next-line react/prop-types
const Spinner = ({ message }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default Spinner;
