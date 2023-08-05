import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import NFTCard from "../components/NFT Card";

function Cart() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [currentNFT, setCurrentNFT] = useState(null);

  useEffect(() => {
    if (user && user.token) {
      fetch(`http://127.0.0.1:8000/nfts/cart/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setCartItems(json);
        })
        .catch((error) => {
          console.error("Cart error: ", error);
        });
    }
  }, [user]);

  const handleBidChange = (e, itemId) => {
    const value = e.target.value;
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, bidAmount: value } : item
      )
    );
  };

  const handleBidSubmit = (itemId) => {
    const currentNFT = cartItems.find((item) => item.id === itemId);
    if (currentNFT) {
      fetch(`http://127.0.0.1:8000/nfts/nft/${currentNFT.nft.id}/place_bid/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ highest_bid: parseFloat(currentNFT.bidAmount) }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCurrentNFT(null);
        })
        .catch((error) => {
          console.error("Bid error: ", error);
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
    fetch(`http://127.0.0.1:8000/nfts/cart/${itemId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedItems = cartItems.filter((item) => item.id !== itemId);
          setCartItems(updatedItems);
        } else if (response.status === 404) {
          console.log("NFT error.");
        } else {
          console.error("Delete error.");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
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
            {cartItems.map((item) => (
              <div className="nft_bid" key={item.id}>
                <NFTCard artist={item.artist} nft={item.nft} key={item.id} />
                {item.nft.is_auction && (
                  <div className="bid">
                    <input
                      type="number"
                      value={item.bidAmount}
                      placeholder="Enter your bid"
                      onChange={(e) => handleBidChange(e, item.id)}
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
