import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '@/styles/Header.css';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    setIsLoggedIn(loggedIn === true);
  }, []);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

    const handleLogout = () => {
      localStorage.removeItem("User");
      localStorage.removeItem("password");
      localStorage.removeItem("userLoggedIn");
      setIsLoggedIn(false);
      navigate("/");
  };

  return (
    <header className='header'>
      <div className='logo'>
        <h1>Course Dashboard</h1>
      </div>
      <button className='hamburger' onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></button>
      <nav className={`nav ${openMenu ? 'active' : ``}`}>
        <ul>
          {!isLoggedIn && <li><Link to="/">Login</Link></li>}
          {isLoggedIn && (
            <>
              <li><Link to="/courses" className="course-list-btn">Courses List</Link></li>
              <li>
                <Link to="/courses/new" className="add-course-btn">
                  + Add New Course
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
