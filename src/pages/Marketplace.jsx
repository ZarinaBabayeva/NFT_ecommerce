import NFTCard from "../components/NFT Card";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
function Marketplace() {
  const [artists, setArtists] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [value, setValue] = useState("");
  const nftPerPage = 9;
  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((response) => response.json())
      .then((json) => {
        setArtists(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/nfts")
      .then((response) => response.json())
      .then((json) => {
        setNfts(json);
        setLoading(false);
      });
  }, []);

  const totalPageCount = Math.ceil(nfts.length / nftPerPage);
  if (activePage > totalPageCount) {
    setActivePage(totalPageCount);
  }
  const start = activePage > 1 ? (activePage - 1) * nftPerPage : activePage;
  const end = start + nftPerPage;

  const filtredByName = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setNfts([...nfts]);
      setActivePage(1);
      return;
    }
    const filteredNfts = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(value.toLowerCase())
    );
    setActivePage(1);
    setNfts(filteredNfts);
    console.log(filteredNfts);
  };
  return loading ? (
    <Loading />
  ) : artists.length !== 0 && nfts.length !== 0 ? (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section className="about_head_section">
        <div className="container">
          <h1>Browse Marketplace</h1>
          <p>Browse through more than 50k NFTs on the NFT Marketplace.</p>
          <form className="search_form">
            <input
              type="text"
              id="search"
              className="input_css"
              placeholder="Search your favourite NFTs"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button id="search_btn" onClick={filtredByName}>
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/magnifyingglass@2x.svg"
                alt=""
              />
            </button>
          </form>
        </div>
      </section>
      <section className="frame_nav_nft">
        <div className="container">
          <ul className="frame_nav marketplace_page j-flex">
            <li>
              Nfts<span className="count_art">302</span>
            </li>
            <li>
              Collections<span className="count_art">67</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="nft_card_section">
        <div className="container">
          <div className="nft_cards_row j-flex">
            {nfts.length &&
              nfts.slice(start, end).map((a, index) => {
                return (
                  <NFTCard
                    key={a.id}
                    artist={artists.find((artist) => artist.id === a.artistID)}
                    nft={a}
                  />
                );
              })}
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
  ) : null;
}

export default Marketplace;
