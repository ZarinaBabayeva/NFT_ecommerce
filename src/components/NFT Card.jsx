import { Link } from "react-router-dom";
function NFTCard({ artist, nft }) {
  return (
    <Link to={`/nft/${nft.id}`} className="nft_card home-card">
      <div className="nft_card_image">
        <img src={nft.image} alt="" />
      </div>
      <div className="nft_card_info">
        <div className="artist_info">
          <h5>{nft.name}</h5>
          <div className="artist_card j-flex">
            <img src={artist.avatar} alt="" />
            <p>{artist.userName}</p>
          </div>
        </div>
        <div className="nft_additional_info j-flex">
          <p>
            Price<span>{nft.price} ETH</span>
          </p>
          <p>
            Highest Bid<span>{nft.highestBid} wETH</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NFTCard;
