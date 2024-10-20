import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';  // Sesuaikan path ini dengan struktur proyek Anda

function Header() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container justify-content-between">
                <div className="text-center mx-auto">
                    <h3>Lost & Found App</h3>
                </div>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li> <b className='dropdown-item'>{user ? user.name : 'Null'}</b> </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;