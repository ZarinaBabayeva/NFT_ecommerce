import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="profile-page">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="container">
        {user ? (
          <div className="profile-container">
            <div className="profile-header">
              <img
                className="profile-avatar"
                src={user.avatar}
                alt={`${user.username}'s Avatar`}
              />
            </div>
            <div className="profile-body">
              <h2>{`${user.username}'s Profile`}</h2>
              <p>Email: {`${user.email}`}</p>
              <p>Bio: {`${user.bio}`}</p>
              <p>Wallet Adress: {`${user.walletAdress}`}</p>
            </div>
            <div className="profile-footer">
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="sign-in-prompt">
            <h3 className="view">Please sign in</h3>
            <p>📋</p>
            <Link to="/signin" className="btn">
              Go to Sign In Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;


{
  /* <p>Welcome, {user.username}!</p>
          <button onClick={handleSignOut}>Sign Out</button> */
}