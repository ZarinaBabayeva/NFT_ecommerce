import NFTCard from "../components/NFT Card";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Auction from "../components/Auction";
import Loading from "../components/Loading";

function NFT() {
  const { id } = useParams();
  const [artists, setArtists] = useState([]);
  const [nft, setNft] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const nftPerPage = 3;
  const totalPageCount = Math.ceil(
    nfts.filter((f) => f.artistID === nft.artistID).length / nftPerPage
  );
  if (activePage > totalPageCount) {
    setActivePage(totalPageCount);
  }
  const start = activePage > 1 ? (activePage - 1) * nftPerPage : activePage;
  const end = start + nftPerPage;

  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((response) => response.json())
      .then((json) => {
        setArtists(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/nfts`)
      .then((response) => response.json())
      .then((json) => {
        setNfts(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/nfts/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setNft(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/auctions`)
      .then((response) => response.json())
      .then((json) => {
        setAuctions(json);
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loading />
  ) : artists.length !== 0 && auctions.length !== 0 && nfts.length !== 0 ? (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <img id="image_placeholder" src={nft.image} alt="" />
      <section class="artist_info_section">
        <div class="container">
          <div class="nft_info j-flex">
            <div class="artist_name_info">
              <h1>{nft.name}</h1>
              <p>Minted On {nft.addTime}</p>
              <div class="created_by">
                <p class="name">Created By</p>
                <div class="artist_card j-flex">
                  <a href="#">
                    <img
                      src={artists.find((a) => a.id === nft.artistID)?.avatar}
                      alt=""
                    />
                  </a>
                  <p>{artists.find((a) => a.id === nft.artistID)?.userName}</p>
                </div>
              </div>
              <p class="name">Description</p>
              <p id="pre">
                The Orbitians is a collection of 10,000 unique NFTs on the
                Ethereum blockchain, There are all sorts of beings in the NFT
                Universe. The most advanced and friendly of the bunch are
                Orbitians. They live in a metal space machines, high up in the
                sky and only have one foot on Earth. These Orbitians are a
                peaceful race, but they have been at war with a group of
                invaders for many generations. The invaders are called
                Upside-Downs, because of their inverted bodies that live on the
                ground, yet do not know any other way to be. Upside-Downs
                believe that they will be able to win this war if they could
                only get an eye into Orbitian territory, so they've taken to
                make human beings their target.
              </p>
              <p class="name">Details</p>
              <ul class="web_site">
                <li>
                  <a href="#" class="j-flex">
                    <img
                      src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/globe@2x.svg"
                      alt=""
                    />
                    View on Etherscan
                  </a>
                </li>
                <li>
                  <a href="#" class="j-flex">
                    <img
                      src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/globe@2x.svg"
                      alt=""
                    />
                    View Original
                  </a>
                </li>
              </ul>
              <p class="name">Tags</p>
              <ul class="tags_list j-flex ">
                <li>
                  <a href="#" class="btn">
                    Animation
                  </a>
                </li>
                <li>
                  <a href="#" class="btn">
                    Demostration
                  </a>
                </li>
                <li>
                  <a href="#" class="btn">
                    Moon
                  </a>
                </li>
                <li>
                  <a href="#" class="btn">
                    Moon
                  </a>
                </li>
              </ul>
            </div>
            <div class="auction_time_div">
              <Auction
                endDate={auctions.find((a) => a.nftID === nft.id)?.endDate}
              />
            </div>
          </div>
        </div>
      </section>
      <section class="more_nfts_from_artist">
        <div class="container">
          <div class="headline j-flex">
            <div class="heading">
              <h3>More From This Artist</h3>
            </div>
            <Link
              class="btn headline_btn"
              to={`/artist/${artists.find((a) => a.id === nft.artistID).id}`}
            >
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/arrowright@2x.svg"
                alt=""
              />
              Go To Artist Page
            </Link>
          </div>
          <div class="nft_cards_row j-flex">
            {nfts
              .filter((f) => f.artistID === nft.artistID)
              .slice(start, end)
              .map((a, index) => {
                if (index < 3) {
                  return (
                    <NFTCard
                      key={a.id}
                      artist={artists.find((f) => f.id === a.artistID)}
                      nft={a}
                      idx={index}
                    />
                  );
                }
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

export default NFT;
