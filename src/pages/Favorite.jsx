import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import NFTCard from "../components/NFT Card";
import Loading from "../components/Loading";

function Favorite() {
  const { user, favoriteItems } = useContext(AuthContext);

  if (!user) {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container">
          <h3 className="view">
            Please sign in to view your favorites.&#128519;
          </h3>
        </div>
      </>
    );
  }

  if (favoriteItems.length === 0) {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container">
          <h3 className="view">You have no favorite items.&#128556;</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section className="about_head_section">
        <div className="container">
          <h1>Your Fav NFT</h1>
          <p>
            Every NFT purchase is a support for art and artists, as well as an
            opportunity to become the owner of a unique piece. Experience
            unforgettable emotions and create your own collection of digital
            assets that will grow and bring joy for many years to come.
          </p>
        </div>
      </section>
      <section className="nft_card_section">
        <div className="container">
          <div className="nft_cards_row j-flex">
            {favoriteItems.map((item) => (
              <NFTCard key={item.id} artist={item.artist} nft={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Favorite;
{
  /* <div>
      <h2>Favorite Items</h2>
      <ul>
        {favoriteItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div> */
}
