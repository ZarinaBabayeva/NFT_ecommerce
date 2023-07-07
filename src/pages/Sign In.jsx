import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("db.json");
    const data = await response.json();
    const users = data.users;
    const artists = data.artists;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    const artist = artists.find(
      (artist) => artist.userName === username && artist.password === password
    );

    if (user) {
      signIn(user);
      setIsSignedIn(true);
      setMessage("User sign-in successful!");
      navigate("/marketplace");
    } else if (artist) {
      setMessage("Artist sign-in successful!");
      setIsSignedIn(true);
    } else {
      setMessage("Invalid username or password");
      setIsSignedIn(false);
    }
  };
  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="create-account">
          <div className="image_flex">
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/image-placeholder-85@1x.png"
              alt=""
            />
          </div>
          <div className="create">
            <div className="head_c">
              <h1>Sign in Account</h1>
              <p>Welcome! Enter Your Details And Start</p>
              <p>Creating, Collecting And Selling Nfts.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user-4@2x.svg"
                  alt=""
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/lockkey@2x.svg"
                  alt=""
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="btn">
                Sign In
              </button>
            </form>
            <div className="have j-flex">
              <p>{message}</p>
              <p>Don't have an account?</p>
              <Link to="/createAccount" className="btn">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
