import React from 'react';
import './Header.css';
function Header() {
  return (
    <header className="header">
      <div className="intestazione">
        <div className="logo-images">
        <img src="images-4.jpeg" alt="Ricamo 1" className="logo-img img-back" />
        <img src="logo1.jpg" alt="Ricamo 2" className="logo-img img-middle" />
        <img src="img9.jpeg" alt="Ricamo 3" className="logo-img img-front" />
        </div>
          <div className="brand">
            <h1 className="brand-name">Isabella</h1>
            <p className="brand-subtitle">Ricami personalizzati</p>
        </div>
      </div>
    </header>
  );
}
export default Header;