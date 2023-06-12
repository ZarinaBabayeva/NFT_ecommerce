import { Link } from "react-router-dom";
function RankingRow({ artist, count }) {
  return (
    <tr className="ranking_tr">
      <td>
        <span>{count}</span>
      </td>
      <td>
        <Link>
          <div
            className="artist_card j-flex"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            <img src={artist.avatar} alt="" />
            <h2>{artist.userName}</h2>
          </div>
        </Link>
      </td>
      <td style={{ color: "#00ac4f" }}>+1.41%</td>
      <td className="mobile">{artist.solds}</td>
      <td>{artist.eth} ETH</td>
    </tr>
  );
}

export default RankingRow;
