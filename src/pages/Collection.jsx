import React, { useState, useEffect, useContext } from "react";
import NFTCard from "../components/NFT Card";
import Loading from "../components/Loading";
import { AuthContext } from "../components/AuthContext";

function Collection() {
  const [collections, setCollections] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3000/collections")
      .then((response) => response.json())
      .then((json) => {
        setCollections(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((response) => response.json())
      .then((json) => {
        setArtists(json);
        setLoading(false);
      });
  }, []);

  const handleSelectCollection = (collection) => {
    console.log("Selected collection:", collection);
    // Perform any desired actions with the selected collection
  };

  if (!user) {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container">
          <h3 className="view">Please sign in to view your collections. &#128519;</h3>
        </div>
      </>
    );
  }

  return loading ? (
    <Loading />
  ) : collections.length !== 0 && artists.length !== 0 ? (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="collection-page">
          <h1>My Collections</h1>
          <div className="collection-list">
            {collections.map((collection) => (
              <div className="collection-item" key={collection.id}>
                <h2>{collection.title}</h2>
                <div className="nft-card-list j-flex">
                  {collection.nfts &&
                    collection.nfts.map((nft) => (
                      <NFTCard
                        key={nft.id}
                        artist={artists.find(
                          (artist) => artist.id === nft.artistID
                        )}
                        nft={nft}
                        onSelectCollection={handleSelectCollection}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default Collection;
