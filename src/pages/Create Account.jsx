import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [userOption, setUserOption] = useState("user");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUserOptionChange = (event) => {
    setUserOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error("Password and Confirm Password do not match.");
      return;
    }
    if (!isUsernameAvailable) {
      console.error("Username is not available.");
      return;
    }
    if (userOption === "user") {
      createUser();
    } else if (userOption === "artist") {
      createArtist();
    }
  };

  const createUser = async () => {
    const user = { email, username, password };
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("User created:", data);

      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const createArtist = async () => {
    const artist = {
      userName: username,
      password: password,
      avatar:
        "https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/avatar-placeholder-137@2x.png",
      eth: 0,
      volume: 0,
      followers: 0,
      solds: 0,
      bio: "",
      walletAddress: "",
    };

    try {
      const response = await fetch("http://localhost:3000/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artist),
      });

      if (response.ok) {
        const { id } = await response.json();
        const newArtist = {
          id,
          ...artist,
        };

        console.log("Artist created:", newArtist);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.error("Error creating artist:", response.status);
      }
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  useEffect(() => {
    if (!email || !username || !password) {
      return;
    }

    const checkUsernameAvailability = async () => {
      try {
        const response = await fetch(`/api/users?username=${username}`);
        const data = await response.json();
        setIsUsernameAvailable(data.available);
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    };

    checkUsernameAvailability();
  }, [username]);

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
              <h1>Create Account</h1>
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
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </label>
              <br />
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/envelopesimple-4@2x.svg"
                  alt=""
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </label>
              <br />
              <div className="j-flex radio_div">
                <label className="radio_label">
                  User
                  <input
                    type="radio"
                    name="user_option"
                    value="user"
                    checked={userOption === "user"}
                    onChange={handleUserOptionChange}
                  />
                </label>
                <label className="radio_label">
                  Artist
                  <input
                    type="radio"
                    name="user_option"
                    value="artist"
                    checked={userOption === "artist"}
                    onChange={handleUserOptionChange}
                  />
                </label>
              </div>
              <br />
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/lockkey@2x.svg"
                  alt=""
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </label>
              <br />
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/lockkey@2x.svg"
                  alt=""
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </label>
              <br />
              <button className="btn" type="submit">
                Create Account{" "}
              </button>
            </form>
            <div className="have j-flex">
              <p>If you have an account enter here:</p>
              <Link to="/signIn" className="btn">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
