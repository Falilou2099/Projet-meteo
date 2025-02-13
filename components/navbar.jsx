import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/nouvelle-page">Nouvelle Page</Link></li>
        <li><Link to="/autre-page">Autre Page</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
