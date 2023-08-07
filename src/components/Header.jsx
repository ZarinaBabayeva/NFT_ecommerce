import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Header({ isSignedIn }) {
  const { user, signOut } = useContext(AuthContext);
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
        {user && (
          <>
            <NavLink to="/favorite">Favorites</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/collection">Collection</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </>
        )}
        <NavLink to="/contactUs">Contact Us</NavLink>
        <NavLink to="/connectWallet">Connect a wallet</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {user ? (
          <NavLink to="/" className="btn" onClick={signOut}>
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user@2x.svg"
              alt=""
            />
            Sign Out
          </NavLink>
        ) : (
          <NavLink to="/signIn" className="btn">
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user@2x.svg"
              alt=""
            />
            Sign In
          </NavLink>
        )}
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
            {user && (
              <>
                <NavLink to="/favorite" onClick={toggleMenu}>
                  Favorites
                </NavLink>
                <NavLink to="/cart" onClick={toggleMenu}>
                  Cart
                </NavLink>
                <NavLink to="/collection" onClick={toggleMenu}>
                  Collection
                </NavLink>
                <NavLink to="/blog" onClick={toggleMenu}>
                  Blog
                </NavLink>
              </>
            )}
            <NavLink to="/about" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink to="/about" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink to="/rankings" onClick={toggleMenu}>
              Rankings
            </NavLink>
            <NavLink to="/connectWallet" onClick={toggleMenu}>
              Connect a wallet
            </NavLink>
            {user ? (
              <NavLink to="/" className="btn" onClick={signOut}>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user@2x.svg"
                  alt=""
                />
                Sign Out
              </NavLink>
            ) : (
              <NavLink to="/signIn" className="btn" onClick={toggleMenu}>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user@2x.svg"
                  alt=""
                />
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
