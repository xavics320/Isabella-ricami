import React from 'react';
import './Header.css';
function Header() {
  return (
    <header className="header">
      <div className="intestazione">
        <div className="logo-images">
        <img src="/logo1-nobg.png" alt="Logo Isabella Ricami" className="logo-img" loading="eager" />
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