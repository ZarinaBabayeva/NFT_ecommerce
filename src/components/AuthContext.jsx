import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
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
          setUser({ ...userData, token });
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
        setUser({ ...userData, token });
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
    console.log(token);
    return fetch("http://127.0.0.1:8000/accounts/user/", {
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

  const addToCart = (nftId) => {
    const newItem = { nft: nftId, quantity: 1 };
    fetch("http://127.0.0.1:8000/nfts/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems([...cartItems, data]);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении элемента в корзину: ", error);
      });
  };

  const removeFromCart = (itemId) => {
    fetch(`http://127.0.0.1:8000/nfts/cart/${itemId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedCart = cartItems.filter((item) => item.id !== itemId);
          setCartItems(updatedCart);
        } else {
          throw new Error("Failed to delete item from cart.");
        }
      })
      .catch((error) => {
        console.error("Ошибка при удалении элемента из корзины: ", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, addToCart, removeFromCart, cartItems }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
