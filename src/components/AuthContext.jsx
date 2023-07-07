import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [collectionItems, setCollectionItems] = useState([]);

  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
    setCartItems([]);
    setFavoriteItems([]);
    setCollectionItems([]);
  };

  const addToCollection = (item) => {
    setCollectionItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCollection = (itemId) => {
    setCollectionItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cartItems,
        favoriteItems,
        collectionItems,
        signIn,
        signOut,
        setCartItems,
        setFavoriteItems,
        addToCollection,
        removeFromCollection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

