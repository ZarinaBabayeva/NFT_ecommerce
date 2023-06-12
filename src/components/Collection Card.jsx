import { Link } from "react-router-dom";
function CollectionCard({ collection, artist }) {
  return (
    <div className="collection_card">
      <Link>
        <img src={collection.images[0]} alt="" />
      </Link>
      <div className="frame j-flex">
        <Link>
          <img src={collection.images[1]} alt="" />
        </Link>
        <Link>
          <img src={collection.images[2]} alt="" />
        </Link>
        <Link className="btn">
          {collection.images.length > 5
            ? collection.images.length % 5
              ? `${
                  collection.images.length - (collection.images.length % 5)
                }+`
              : collection.images.length
            : collection.images.length}
        </Link>
      </div>
      <h5>{collection.title}</h5>
      <div className="artist_card j-flex">
        <Link>
          <img src={artist.avatar} alt="" />
        </Link>
        <p>{artist.userName}</p>
      </div>
    </div>
  );
}

export default CollectionCard;
