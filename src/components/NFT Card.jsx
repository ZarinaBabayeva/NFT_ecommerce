import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

function NFTCard({ artist, nft }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (id) => {
    setIsAddedToCart(true);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userName === "admin"
          ? { ...user, basket: [...user.basket, id] }
          : user
      )
    );
  };

  return loading ? (
    <Loading />
  ) : users.length !== 0 ? (
    <Link to={`/nft/${nft.id}`} className="nft_card home-card">
      <div className="nft_card_image">
        <img src={nft.image} alt="" />
      </div>
      <div className="nft_card_info">
        <div className="artist_info">
          <h5>{nft.name}</h5>
          <div className="artist_card j-flex">
            <img src={artist.avatar} alt="" />
            <p>{artist.userName}</p>
          </div>
        </div>
        <div className="nft_additional_info j-flex">
          <p>
            Price<span>{nft.price} ETH</span>
          </p>
          <p>
            Highest Bid<span>{nft.highestBid} wETH</span>
          </p>
          <i
            className={`fa-solid fa-cart-shopping ${
              isAddedToCart ? "added-to-cart" : ""
            }`}
            onClick={() => handleAddToCart(nft.id)}
          ></i>
        </div>
      </div>
      <i className={`fa-solid fa-heart`}></i>
    </Link>
  ) : null;
}

export default NFTCard;
