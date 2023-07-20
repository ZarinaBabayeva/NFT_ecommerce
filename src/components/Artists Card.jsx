import { Link } from "react-router-dom";
function ArtistsCard({ artist, count }) {
  return (
    <Link to={`/artist/${artist.id}`} className="artists_card" >
      <div className="artists_card_avatar">
        <span className="no_artist">{count}</span>
        <img src={artist.avatar} />
      </div>
      <div className="artists_card_about">
        <h5>{artist.username}</h5>
        <p>
          Bio:<span className="eth">{artist.bio}</span>
        </p>
      </div>
    </Link>
  );
}

export default ArtistsCard;
