function CategoryCard({ category }) {
  return (
      <div className="category_card">
        <div className="category_card_image">
          <img src={category.bcground} alt="" />
          <img src={category.icon} alt="" />
        </div>
        <div className="category_card_text">
          <h5>{category.title}</h5>
        </div>
      </div>
  );
}

export default CategoryCard;
