import NFTCard from "../components/NFT Card";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { AuthContext } from "../components/AuthContext";
function Artist() {
  const { id } = useParams();

  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState({});
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [activePage, setActivePage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    console.log(user)
    const token = user ? user.token : null;

    if (!token) {
      console.error("No token authentication.");
      return;
    }

    fetch(`http://127.0.0.1:8000/accounts/follow/${id}/`, {
      method: isFollowing ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsFollowing(!isFollowing);
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  const nftPerPage = 3;
  let totalSales = artists
    .map((artist) => artist.solds)
    .reduce((sum, a) => sum + a, 0);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts/users_list/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setArtists(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/nfts")
      .then((response) => response.json())
      .then((json) => {
        setNfts(json);
        console.log(nfts);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/accounts/user_detail/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setArtist(json);
      });
  }, []);
  const totalPageCount = Math.ceil(
    nfts.filter((f) => f.artistID === artist.id).length / nftPerPage
  );
  if (activePage > totalPageCount) {
    setActivePage(totalPageCount);
  }
  const start = activePage > 1 ? (activePage - 1) * nftPerPage : activePage;
  const end = start + nftPerPage;

  function copyWallet() {
    navigator.clipboard
      .writeText(artist.walletAddress)
      .then(() => {
        console.log(`Copied ${artist.walletAddress} to clipboard!`);
      })
      .catch((error) => {
        console.error(
          `Failed to copy ${artist.walletAddress} to clipboard: ${error}`
        );
      });
  }
  return loading ? (
    <Loading />
  ) : artist.length !== 0 && nfts.length !== 0 ? (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section id="placeholder">
        <Link to="/artist" className="artist_absolute_img">
          <img src={artist.avatar} alt="" />
        </Link>
      </section>
      <section className="artist_info_section">
        <div className="container">
          <div className="nft_info j-flex">
            <div className="artist_name_info">
              <h1>{artist.userName}</h1>
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
              <p className="name">Bio</p>
              <p id="pre">{artist.bio}</p>
              <p className="name">Links</p>
              <ul className="web">
                <Link>
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/discordlogo-1@2x.svg"
                    alt=""
                  />
                </Link>
                <Link>
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/youtubelogo-1@2x.svg"
                    alt=""
                  />
                </Link>
                <Link>
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/twitterlogo-1@2x.svg"
                    alt=""
                  />
                </Link>
                <Link>
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/instagramlogo-1@2x.svg"
                    alt=""
                  />
                </Link>
              </ul>
            </div>
            <div className="artist_info_wallet">
              <Link className="btn" onClick={copyWallet}>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/copy@2x.svg"
                  alt=""
                />
                {artist.walletAddress?.slice(0, 5) +
                  "..." +
                  artist.walletAddress?.slice(28)}
              </Link>
              <Link className="btn headline_btn" onClick={handleFollow}>
                {isFollowing ? "Following" : "Follow"}
              </Link>
            </div>
            <div className="artist_info_wallet mobile">
              <Link className="btn" onClick={copyWallet}>
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/copy@2x.svg"
                  alt=""
                />
              </Link>
              <Link className="btn headline_btn">
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/plus@2x.svg"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="frame_nav_nft">
        <div className="container">
          <ul className="frame_nav artist_page j-flex">
            <li>
              Created
              <span className="count_art">320</span>
            </li>
            <li>
              Owned<span className="count_art">67</span>
            </li>
            <li>
              Collection<span className="count_art">4</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="nft_card_section">
        <div className="container">
          <div className="nft_cards_row j-flex">
            {nfts
              .filter((f) => f.artistID === artist.id)
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

export default Artist;
