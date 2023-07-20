import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
  };
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserInfo(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          signOut();
        });
    }
  }, []);
  const signIn = (token) => {
    setToken(token);
    fetchUserInfo(token)
      .then((userData) => {
        setUser(userData);
        navigate("/");
      })
      .catch((error) => {
        signOut();
      });
  };
  const signOut = () => {
    removeToken();
    setUser(null);
    navigate("/signIn");
  };
  const fetchUserInfo = (token) => {
    return fetch("http://localhost:8000/accounts/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user info");
        }
      })
      .then((userData) => {
        return userData;
      });
  };
  
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
