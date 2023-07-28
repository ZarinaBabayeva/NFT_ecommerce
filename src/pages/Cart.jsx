import React, { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import NFTCard from "../components/NFT Card";

function Cart() {
  const { user, cartItems, setCartItems } = useContext(AuthContext);
  const [bidAmount, setBidAmount] = useState("");
  const [currentNFT, setCurrentNFT] = useState(null); // Состояние для хранения выбранного NFT
  console.log(cartItems)

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidSubmit = () => {
    if (currentNFT) {
      fetch(`http://127.0.0.1:8000/nft/${currentNFT.id}/place_bid/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Передаем токен аутентификации
        },
        body: JSON.stringify({ highest_bid: parseFloat(bidAmount) }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Здесь вы можете обработать ответ от сервера после успешной ставки
          setBidAmount(""); // Очистить поле ввода ставки после успешной ставки
          setCurrentNFT(null); // Очистить текущий NFT после успешной ставки
        })
        .catch((error) => {
          console.error("Ошибка при размещении ставки: ", error);
        });
    }
  };

  if (!user) {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container">
          <h3 className="view">Please sign in to view your cart.&#128519;</h3>
        </div>
      </>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container cart_view">
          <h3 className="view">Your cart is empty.&#128556;</h3>
          <p>Start shopping now:</p>
          <Link to="/marketplace" className="btn">
            Shop
          </Link>
        </div>
      </>
    );
  }

  const handleItemRemove = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section className="about_head_section">
        <div className="container">
          <h1>Your Cart</h1>
          <p>
            Build Your Legacy, Collect Your Dreams Create your own legacy as you
            curate a collection of NFTs that resonates with your dreams and
            aspirations. With each acquisition, you weave a narrative that
            reflects your unique taste, passions, and values. Every NFT you add
            to your collection tells a story and becomes a part of your personal
            journey.
          </p>
        </div>
      </section>
      <section className="nft_card_section">
        <div className="container">
          <div className="nft_cards_row j-flex">
            {cartItems?.map((item) => (
              <div className="nft_bid">
                <NFTCard artist={item.artist} nft={item} key={item.id} />
                {item.auction && (
                  <div className="bid">
                    <input
                      type="number"
                      value={bidAmount}
                      placeholder="Enter your bid"
                      onChange={handleBidChange}
                    />
                    <button
                      onClick={() => handleBidSubmit(item.id)}
                      className="btn"
                    >
                      Confirm
                    </button>
                  </div>
                )}
                <i
                  className="fa-regular fa-trash-can operations_btn trash"
                  onClick={() => handleItemRemove(item.id)}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
