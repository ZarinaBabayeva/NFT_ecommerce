import "./App.css";
import "./AppResponse.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Cursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nft/:id" element={<NFT />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/connectWallet" element={<ConnectWallet />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
