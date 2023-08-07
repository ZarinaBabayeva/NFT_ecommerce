import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {user ? (
        <>
          <div className="container">
          <>
          <div className="profile-container">
            <div className="profile-header">
              {/* Profil avatar */}
            </div>
            <div className="profile-body">
              {/* profile details */}
            </div>
            <div className="profile-footer">
              {/* Sign Out Button */}
              <button className="sign-out-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </>

          </div>
        </>
      ) : (
        <div className="container">
          <div className="cart_view">
            <h3 className="view">Please sign in </h3>
            <p>&#129488;</p>
            <Link to="/signin" className="btn ">
              Go to Sign In Page
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
{
  /* <p>Welcome, {user.username}!</p>
          <button onClick={handleSignOut}>Sign Out</button> */
}
