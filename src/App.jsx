import "./App.css";
import "./AppResponse.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NFT from "./pages/NFT";
import Artist from "./pages/Artist";
import Marketplace from "./pages/Marketplace";
import Rankings from "./pages/Rankings";
import ConnectWallet from "./pages/Connect Wallet";
import CreateAccount from "./pages/Create Account";
import Cursor from "./components/Cursor";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import SignIn from "./pages/Sign In";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ContactUs from "./pages/Contact Us";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Cursor />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft/:id" element={<NFT />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="contactUS" element={<ContactUs />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/connectWallet" element={<ConnectWallet />} />
          <Route path="/createAccount" element={<CreateAccount />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;