import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="j-flex">
      <NavLink to="/">
        <img
          src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/storefront-2@2x.svg"
          alt=""
        />
        <img
          style={{ marginLeft: "20px" }}
          src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/nft-marketplace-1@2x.svg"
          alt=""
        />
      </NavLink>
      <img
        id="menu_icon"
        src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/burger-menu-@2x.svg"
        alt=""
        onClick={toggleMenu}
      />
      <ul className="menu j-flex">
        <NavLink to="/marketplace">Marketplace</NavLink>
        <NavLink to="/rankings">Rankings</NavLink>
        <NavLink to="/favorite">Favorite</NavLink>
        <NavLink to="/basket">Basket</NavLink>
        <NavLink to="/connectWallet">Connect a wallet</NavLink>
        <NavLink to="/createAccount" className="btn">
          <img
            src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user@2x.svg"
            alt=""
          />
          Sign Up
        </NavLink>
      </ul>
      {isMenuOpen && (
        <div className="modal-container">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div className="modal-menu">
            <span className="close-button" onClick={toggleMenu}>
              &times;
            </span>
            <NavLink to="/marketplace" onClick={toggleMenu}>
              Marketplace
            </NavLink>
            <NavLink to="/favorite" onClick={toggleMenu}>
              Favorite
            </NavLink>
            <NavLink to="/basket" onClick={toggleMenu}>
              Basket
            </NavLink>
            <NavLink to="/rankings" onClick={toggleMenu}>
              Rankings
            </NavLink>
            <NavLink to="/connectWallet" onClick={toggleMenu}>
              Connect a wallet
            </NavLink>
            <NavLink to="/createAccount" className="btn" onClick={toggleMenu}>
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user@2x.svg"
                alt=""
              />
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
