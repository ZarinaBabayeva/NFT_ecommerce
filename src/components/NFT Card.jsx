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
    fetch("http://localhost:3000/collections")
      .then((response) => response.json())
      .then((json) => {
        setCollections(json);
      });
  }, [collections]);

  const handleAddToCart = () => {
    if (user) {
      setIsAddedToCart(true);
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === nft.id);
        if (existingItem) {
          // NFT already exists in the cart, update the count
          const updatedItems = prevItems.map((item) => {
            if (item.id === nft.id) {
              return { ...item, count: item.count + 1 };
            }
            return item;
          });
          return updatedItems;
        } else {
          // NFT doesn't exist in the cart, add it with count 1
          const newItem = {
            id: nft.id,
            count: 1,
            price: nft.price,
            name: nft.name,
            image: nft.image,
            artist: artists.find((artist) => artist.id === nft.artistID),
            highestBid: nft.highestBid,
            auction: auction,
          };
          return [...prevItems, newItem];
        }
      });
    }
  };

  const handleAddToFavorites = () => {
    if (user) {
      setIsAddedToFavorites(true);
      setFavoriteItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === nft.id);
        if (existingItem) {
          // NFT already exists in favorites, remove it
          const updatedItems = prevItems.filter((item) => item.id !== nft.id);
          return updatedItems;
        } else {
          // NFT doesn't exist in favorites, add it
          const newItem = {
            id: nft.id,
            name: nft.name,
            image: nft.image,
            artist: artists.find((artist) => artist.id === nft.artistID),
            price: nft.price,
            highestBid: nft.highestBid,
            auction: auction,
          };
          return [...prevItems, newItem];
        }
      });
    }
  };

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
          // Update the state with the updated collection
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
            {/* Rest of the code... */}
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
