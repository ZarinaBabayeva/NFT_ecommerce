import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../components/Loading";

function NFTCard({ artist, nft }) {
  const { addToCollection } = useContext(AuthContext);
  const { user, setCartItems, setFavoriteItems } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const [isAddingToCollection, setIsAddingToCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/auctions")
      .then((response) => response.json())
      .then((json) => {
        const currentAuction = json.find((auction) => auction.nftID === nft.id);
        setAuction(currentAuction);
      });
  }, [nft.id]);

  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((response) => response.json())
      .then((json) => {
        setArtists(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:3000/collections");
        const json = await response.json();
        setCollections(json);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleAddToCart = () => {
    if (user) {
      setIsAddedToCart(true);
      fetch(`http://127.0.0.1:8000/nfts/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Передаем токен аутентификации
        },
        body: JSON.stringify({ nft_id: nft.id, quantity: 1, nft_image: nft.image, nft_name: nft.name}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Здесь вы можете обработать ответ от сервера после успешного добавления в корзину
          // Если требуется обновить список элементов в корзине, можете сделать это здесь
        })
        .catch((error) => {
          console.error("Ошибка при добавлении в корзину: ", error);
        });
    }
  };

  const handleAddToFavorites = () => {
    if (user) {
      setIsAddedToFavorites(true);
      fetch(`http://127.0.0.1:8000/nfts/favorite/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Передаем токен аутентификации
        },
        body: JSON.stringify({ nft_id: nft.id, quantity: 1, nft_image: nft.image}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Здесь вы можете обработать ответ от сервера после успешного добавления в корзину
          // Если требуется обновить список элементов в корзине, можете сделать это здесь
        })
        .catch((error) => {
          console.error("Ошибка при добавлении в корзину: ", error);
        });
    }
  };


  /*const handleAddToFavorites = () => {
    if (user) {
      setIsAddedToFavorites(true);
      setFavoriteItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === nft.id);
        if (existingItem) {
          const updatedItems = prevItems.filter((item) => item.id !== nft.id);
          return updatedItems;
        } else {
          const newItem = {
            id: nft.id,
            name: nft.name,
            image: nft.image,
            artist: artists.find((artist) => artist.id === nft.artistID),
            price: nft.price,
            highestBid: nft.highestBid,
            auction: auction,
            addTime: nft.addTime,
          };
          return [...prevItems, newItem];
        }
      });
    }
  };
*/
  const handleAddToCollection = () => {
    setIsAddingToCollection(true);
    setSelectedCollection(null);
  };

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
  };

  const handleCreateCollection = () => {
    if (newCollectionName) {
      const collection = {
        title: newCollectionName,
        userId: user.id,
        nfts: [nft],
      };

      fetch("http://localhost:3000/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Collection created:", data);
          setCollections((prevCollections) => [...prevCollections, data]);
          setSelectedCollection(data);
          setIsAddingToCollection(false);
          setNewCollectionName("");
        })
        .catch((error) => {
          console.error("Error creating collection:", error);
        });
    }
  };

  const handleAddNFTToCollection = () => {
    if (selectedCollection && user) {
      const updatedCollection = {
        ...selectedCollection,
        nfts: [...selectedCollection.nfts, nft],
      };

      fetch(`http://localhost:3000/collections/${selectedCollection.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCollection),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("NFT added to collection:", data);
          setCollections((prevCollections) =>
            prevCollections.map((collection) =>
              collection.id === selectedCollection.id
                ? updatedCollection
                : collection
            )
          );
          setIsAddingToCollection(false);
        })
        .catch((error) => {
          console.error("Error adding NFT to collection:", error);
        });
    }
  };

  const formatTime = (timeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = new Date(timeString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleCloseModal = () => {
    setIsAddingToCollection(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="card">
      <Link to={`/nft/${nft.id}`} className="nft_card home-card">
        <div className="nft_card_image">
          <img src={nft.image} alt="image" />
        </div>
        <div className="nft_card_info">
          <div className="artist_info">
            <h5>{nft.name}</h5>
            <div className="artist_card j-flex">
              {/* <img src={artist.avatar} alt="" /> */}
              {/* <p>{artist.userName}</p> */}
            </div>
          </div>
          <div className="nft_additional_info j-flex">
            <p>
              Price<span>{nft.price} ETH</span>
            </p>
            <p>
              Highest bid:<span>{nft.highestBid} ETH</span>
            </p>
            <p>Created on: {formatTime(nft.addTime)}</p>
          </div>
        </div>
      </Link>
      <div className="operations">
        {user && (
          <>
            <i
              className={`fa-solid fa-cart-shopping operations_btn ${
                isAddedToCart ? "added-to-cart" : ""
              }`}
              onClick={handleAddToCart}
            ></i>{" "}
            <i
              className={`fa-solid fa-heart operations_btn ${
                isAddedToFavorites ? "added-to-favorites" : ""
              }`}
              onClick={handleAddToFavorites}
            ></i>
            <i
              className={`fa-solid fa-plus operations_btn ${
                isAddingToCollection ? "added-to-collection" : ""
              }`}
              onClick={handleAddToCollection}
            ></i>
          </>
        )}
      </div>
      {/* Modal for adding to collection */}
      {isAddingToCollection && (
        <div className="collection-modal">
          <div className="modal-content">
            <h2>Add to Collection</h2>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="collection-list">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className={`collection-item ${
                    selectedCollection === collection ? "selected" : ""
                  }`}
                  onClick={() => handleSelectCollection(collection)}
                >
                  {collection.title}
                </div>
              ))}
            </div>
            <div className="create-collection j-flex">
              <input
                type="text"
                placeholder="New Collection Name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <button onClick={handleCreateCollection} id="button_create">
                Create
              </button>
              <div className="add-to-collection">
                <button onClick={handleAddNFTToCollection}>
                  Add to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NFTCard;
