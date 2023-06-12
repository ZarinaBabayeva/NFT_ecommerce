import { Link } from "react-router-dom";
function ArtistsCard({ artist, count }) {
  return (
    <Link to={`/artist/${artist.id}`} className="artists_card" target="_blank">
      <div className="artists_card_avatar">
        <span className="no_artist">{count}</span>
        <img src={artist.avatar} />
      </div>
      <div className="artists_card_about">
        <h5>{artist.userName}</h5>
        <p>
          Total Sales:<span className="eth">{`${artist.eth} ETH`}</span>
        </p>
      </div>
    </Link>
  );
}

export default ArtistsCard;
