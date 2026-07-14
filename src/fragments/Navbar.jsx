import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // useEffect si esegue una volta al mount del componente
  // aggiunge un "ascoltatore" all'evento scroll della pagina
  useEffect(() => {
    const handleScroll = () => {
      // se l'utente ha scrollato più di 10px, scrolled diventa true
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // cleanup: quando il componente viene smontato, rimuove l'ascoltatore
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // array vuoto = eseguito solo al primo render

  const links = [
    { id: 1, label: 'Chi siamo', href: '#chi-siamo' },
    { id: 2, label: 'Idee', href: '#idee' },
    { id: 3, label: 'Personalizza', href: '#personalizza' },
    { id: 5, label: 'Contatti', href: '#contatti' },
  ];

  return (
    // aggiunge navbar--scrolled alla classe quando scrolled è true
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* brand: sempre nel DOM, diventa visibile con la classe --visible */}
      <span className={`navbar-brand ${scrolled ? 'navbar-brand--visible' : ''}`}>
        Isabella
      </span>

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