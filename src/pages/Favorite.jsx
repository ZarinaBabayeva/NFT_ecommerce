import React, { useState, useEffect } from "react";
import NFTCard from "../components/NFT Card";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

function Favorite() {
  const [artists, setArtists] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterArtist, setFilterArtist] = useState("");

  const nftsPerPage = 9;

  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((response) => response.json())
      .then((json) => {
        setArtists(json);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/nfts")
      .then((response) => response.json())
      .then((json) => {
        setNfts(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NFTs:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredNFTs = nfts.filter((nft) => {
      const matchesSearch = nft.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesArtist = filterArtist
        ? artists.find((artist) => artist.userName.toLowerCase().includes(filterArtist.toLowerCase()))?.id === nft.artistID
        : true;
      return matchesSearch && matchesArtist;
    });
    setNfts(filteredNFTs);
    setActivePage(1); // Reset pagination to first page
  };

  const resetFilters = () => {
    setSearchValue("");
    setFilterArtist("");
    setNfts([]);
    setLoading(true);
    // Refetch the original NFTs
    fetch("http://localhost:3000/nfts")
      .then((response) => response.json())
      .then((json) => {
        setNfts(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NFTs:", error);
        setLoading(false);
      });
  };

  const totalPageCount = Math.ceil(nfts.length / nftsPerPage);

  useEffect(() => {
    if (activePage > totalPageCount) {
      setActivePage(totalPageCount);
    }
  }, [activePage, totalPageCount]);

  const start = activePage > 1 ? (activePage - 1) * nftsPerPage : activePage;
  const end = start + nftsPerPage;

  return (
    <div>
      {loading ? (
        <Loading />
      ) : artists.length !== 0 && nfts.length !== 0 ? (
        <>
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <section className="about_head_section">
            <div className="container">
              <h1>Your Favorite NFTs</h1>
              <p>
                Here, we showcase a collection of handpicked NFTs that are
                individually selected by our users. These unique digital
                artworks have captured the imagination and inspiration of each
                user, reflecting their personal tastes and preferences.
              </p>
            </div>
          </section>
          <section>
            <div className="container">
              <form className="filter_form" onSubmit={handleSearch}>
                <div className="filter">
                  <label htmlFor="filter_for_name">Name:</label>
                  <input
                    type="text"
                    name="filter_for_name"
                    id="filter_for_name"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>

                <div className="filter">
                  <label htmlFor="filter_for_artist">Artist:</label>
                  <input
                    type="text"
                    name="filter_for_artist"
                    id="filter_for_artist"
                    value={filterArtist}
                    onChange={(e) => setFilterArtist(e.target.value)}
                  />
                </div>

                <div className="filter">
                  <label htmlFor="filter_for_date">Date:</label>
                  <input
                    type="date"
                    name="filter_for_date"
                    id="filter_for_date"
                  />
                </div>

                <div>
                  <button id="search_btn_for_favorite" type="submit">
                    <img
                      src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/magnifyingglass@2x.svg"
                      alt=""
                    />
                  </button>
                  <button id="reset_btn_for_favorite" type="button" onClick={resetFilters}>
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section className="nft_card_section">
            <div className="container">
              <div className="nft_cards_row j-flex">
                {nfts.slice(start, end).map((nft) => (
                  <NFTCard
                    key={nft.id}
                    artist={artists.find(
                      (artist) => artist.id === nft.artistID
                    )}
                    nft={nft}
                  />
                ))}
              </div>
              <div className="pagination">
                <Pagination
                  totalPageCount={totalPageCount}
                  setActivePage={setActivePage}
                  activePage={activePage}
                />
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default Favorite;
