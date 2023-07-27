import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState("other");
  const [bio, setBio] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("role", userType);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("avatar", avatar);
    formData.append("gender", gender);
    formData.append("bio", bio);
    formData.append("walletAddress", walletAddress);
    console.log(formData);

    fetch("http://127.0.0.1:8000/accounts/register/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("User created successfully!");
          navigate('/');
        } else {
          console.error("User creation failed!");
        }
      })
      .catch((error) => {
        console.error("An error occurred during user creation:", error);
      });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="create">
          <div className="head_c">
            <h1>Create Account</h1>
            <p>Welcome! Enter Your Details And Start</p>
            <p>Creating, Collecting And Selling Nfts.</p>
          </div>
          <form onSubmit={handleSubmit} className="create_form j-flex">
            <div className="create_left">
              <label>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/user-4@2x.svg"
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <br />
              <div className="j-flex radio_div">
                <label className="radio_label">
                  Buyer
                  <input
                    type="radio"
                    name="user_option"
                    value="buyer"
                    checked={userType === "buyer"}
                    onChange={() => setUserType("buyer")}
                  />
                </label>
                <label className="radio_label">
                  Artist
                  <input
                    type="radio"
                    name="user_option"
                    value="artist"
                    checked={userType === "artist"}
                    onChange={() => setUserType("artist")}
                  />
                </label>
              </div>
              <br />
              <label>
                First Name
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <br />
              <label>
                Last Name
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              <br />
              <label>
                Avatar
                <input type="file" onChange={handleAvatarUpload} required />
              </label>
              <br />
            </div>
            <div className="create-right">
              <label className="create-label">
                Gender
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <br />
              <label className="create-label">
                Bio
                <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                ></textarea>
              </label>
              <br />
              <label>
                Wallet Address
                <input
                  type="text"
                  placeholder="Wallet Address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <br />
              <button className="btn" type="submit">
                Create Account
              </button>
            </div>
          </form>
          <div className="have j-flex">
            <p>If you have an account, enter here:</p>
            <Link to="/signIn" className="btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
