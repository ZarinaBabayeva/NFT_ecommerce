import RankingRow from "../components/Ranking Row";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function Rankings() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((response) => response.json())
      .then((json) => {
        setArtists(json);
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section className="about_head_section">
        <div className="container">
          <h1>Top Creators</h1>
          <p>Check out top ranking NFT artists on the NFT Marketplace.</p>
        </div>
      </section>
      <section className="rankings_nav">
        <div className="container">
          <ul className="frame_nav rankings_page j-flex">
            <li>Today</li>
            <li>This Week</li>
            <li>This Month</li>
            <li>All Time</li>
          </ul>
        </div>
      </section>
      <section className="rankings_table">
        <div className="container">
          <table className="ranking">
            <thead>
              <tr>
                <th>#</th>
                <th>Artist</th>
                <th>Change</th>
                <th className="mobile">NFTs Sold</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {artists
                .sort((a, b) => b.eth - a.eth)
                .map((a, index) => {
                  if (index < 20) {
                    return (
                      <RankingRow key={a.id} artist={a} count={index + 1} />
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Rankings;
