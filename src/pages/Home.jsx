import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CollectionCard from "../components/Collection Card";
import ArtistsCard from "../components/Artists Card";
import CategoryCard from "../components/Category Card";
import NFTCard from "../components/NFT Card";
import GIF from "/Users/user/Desktop/front/public/media/GIF.gif";
import Auction from "../components/Auction";
import Loading from "../components/Loading";

function Home() {
  const [artists, setArtists] = useState([]);
  const [collections, setCollections] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  let totalSales = artists
    .map((artist) => artist.solds)
    .reduce((sum, a) => sum + a, 0);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts/users_list/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setArtists(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/nfts/nfts_list/")
      .then((response) => response.json())
      .then((json) => {
        setNfts(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/collections")
      .then((response) => response.json())
      .then((json) => {
        setCollections(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/auctions")
      .then((response) => response.json())
      .then((json) => {
        setAuctions(json);
        setLoading(false);
      });
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((json) => {
        setCategories(json);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : artists.length !== 0 &&
    collections.length !== 0 &&
    auctions.length !== 0 &&
    categories.length !== 0 ? (
    <>
      <section className="hero">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container">
          <div className="hero_frame j-flex">
            <div className="hero_text">
              <h1>Discover Digital Art & Collect Nfts</h1>
              <p>
                Nft Marketplace Ui Created With Anima For Figma. Collect, Buy
                And Sell Art From More Than 20k Nft Artists.
              </p>
              <Link to="/createAccount" className="btn">
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/rocketlaunch-2@2x.svg"
                  alt=""
                />
                Get Started
              </Link>
              <ul className="additional_info">
                <li>
                  {totalSales > 5
                    ? totalSales % 5
                      ? `${totalSales - (totalSales % 5)}+`
                      : totalSales
                    : totalSales}
                  <span>Total Sale</span>
                </li>
                <li>
                  100k+<span>Auctions</span>
                </li>
                <li>
                  {artists.length > 5
                    ? artists.length % 5
                      ? `${artists.length - (artists.length % 5)}+`
                      : artists.length
                    : artists.length}
                  <span>Artists</span>
                </li>
              </ul>
            </div>
            <div className="hero_gif">
              <Link to="/artist">
                <img src={GIF} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="trending_collection">
        <div className="container">
          <div className="heading">
            <h3>Trending Collection</h3>
            <p>Checkout Our Weekly Updated Trending Collection.</p>
          </div>
          <div className="collection_card_row j-flex">
            {collections.map((a, index) => {
              if (index < 3) {
                return (
                  <CollectionCard
                    key={a.id}
                    collection={a}
                    artist={artists.find((artist) => artist.id == a.artistID)}
                  />
                );
              }
            })}
          </div>
        </div>
      </section>
      <section className="top_rated_artists">
        <div className="container">
          <div className="headline j-flex">
            <div className="heading">
              <h3>Top Creators</h3>
              <p>Checkout Top Rated Creators On The Nft Marketplace</p>
            </div>
            <div className="headline_button">
              <Link className="btn headline_btn" to="/rankings">
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/rocketlaunch-1@2x.svg"
                  alt=""
                />
                View Rankings
              </Link>
            </div>
          </div>
          <div className="artists_card_row j-flex">
            {artists.map((a, index) => {
              if (index < 12) {
                return <ArtistsCard key={a.id} artist={a} count={index + 1} />;
              }
            })}
          </div>
        </div>
      </section>
      <section className="browse_categories">
        <div className="container">
          <div className="heading">
            <h3>Browse Categories</h3>
          </div>
          <div className="category_cards_row j-flex">
            {categories.map((category, index) => {
              return <CategoryCard key={index} category={category} />;
            })}
          </div>
        </div>
      </section>
      <section className="discover_more">
        <div className="container">
          <div className="headline j-flex">
            <div className="heading">
              <h3>Discover More Nfts</h3>
              <p>Explore New Trending Nfts</p>
            </div>
            <div className="headline_button">
              <Link to="/marketplace" className="btn headline_btn">
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/eye@2x.svg"
                  alt=""
                />
                See All
              </Link>
            </div>
          </div>
          <div className="nft_cards_row j-flex">
            {nfts.map((a, index) => {
              if (index < 3) {
                return (
                  <NFTCard
                    key={a.id}
                    artist={artists.find((artist) => artist.id === a.artistID)}
                    nft={a}
                  />
                );
              }
            })}
          </div>
        </div>
      </section>
      <section
        className="nft_highlight"
        style={{
          background: `url(${auctions[0]?.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container">
          <div className="nft_highlight_frame">
            <div className="nft_artist_name_btn">
              <div className="artist_card j-flex">
                <a href="#">
                  <img
                    src={
                      artists.find(
                        (artist) => auctions[0]?.artistID === artist.id
                      )?.avatar
                    }
                    alt=""
                  />
                </a>
                <p>
                  {
                    artists.find((artist) => auctions[0].artistID === artist.id)?.userName
                  }
                </p>
              </div>
              <h1>
                {
                  collections.find(
                    (collection) => auctions[0].collectionID === collection.id
                  ).title
                }
              </h1>
              <a href="#" className="btn">
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/eye@2x.svg"
                  alt=""
                />
                See NFT
              </a>
            </div>
            <div className="auction_time_div">
              <Auction endDate={auctions[0]?.endDate} />
            </div>
          </div>
        </div>
      </section>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section className="how_it_works">
        <div className="container">
          <div className="heading">
            <h3>How It Works</h3>
            <p>Find Out How To Get Started</p>
          </div>
          <div className="card_row j-flex">
            <div className="info_card">
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/icon-3@2x.svg"
                alt=""
              />
              <div className="info">
                <h5>Setup Your Wallet</h5>
                <p>
                  Set up your wallet of choice. Connect it to the Animarket by
                  clicking the wallet icon in the top right corner.
                </p>
              </div>
            </div>
            <div className="info_card">
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/icon-4@2x.svg"
                alt=""
              />
              <div className="info">
                <h5>Setup Your Wallet</h5>
                <p>
                  Set up your wallet of choice. Connect it to the Animarket by
                  clicking the wallet icon in the top right corner.
                </p>
              </div>
            </div>
            <div className="info_card">
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/icon-5@2x.svg"
                alt=""
              />
              <div className="info">
                <h5>Setup Your Wallet</h5>
                <p>
                  Set up your wallet of choice. Connect it to the Animarket by
                  clicking the wallet icon in the top right corner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="subscribe_widget">
        <div className="container">
          <div className="subscribe_widget_div j-flex">
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/photo-1@2x.png"
              alt=""
            />
            <div className="subscribe_widget_frame">
              <h1>Join Our Weekly Digest</h1>
              <p>Get Exclusive Promotions & Updates Straight To Your Inbox.</p>
              <form>
                <input
                  type="email"
                  name=""
                  id="mailFormINPUT"
                  placeholder="Enter your email here"
                />
                <button id="mailFormBTN">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/envelopesimple-1@2x.svg"
                    alt=""
                  />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : null;
}

export default Home;
