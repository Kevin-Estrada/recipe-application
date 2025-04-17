import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark">
        <Link to="/recipes" className="navbar-brand">
          Recipe System
        </Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;
