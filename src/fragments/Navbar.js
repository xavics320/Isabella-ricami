// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeLink, setActiveLink] = useState('');

  const links = [
    { id: 1, label: 'Chi siamo', href: '#chi-siamo' },
    { id: 2, label: 'Idee', href: '#idee' },
    { id: 3, label: 'Personalizza', href: '#personalizza' },
    { id: 4, label: 'Fai un preventivo', href: '#preventivo' },
    { id: 5, label: 'Contatti', href: '#contatti' },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {links.map((link, index) => (
          <React.Fragment key={link.id}>
            <li className="navbar-item">
              <a
                href={link.href}
                className={`navbar-link ${activeLink === link.id ? 'active' : ''}`}
                onClick={() => setActiveLink(link.id)}
              >
                {link.label}
              </a>
            </li>
            {index < links.length - 1 && (
              <li className="navbar-separator">|</li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
