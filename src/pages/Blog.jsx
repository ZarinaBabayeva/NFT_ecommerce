import React, { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";

const Blog = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { user, signIn, signOut } = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const getLoggedInArtistId = () => {
    // Replace with your implementation to retrieve the logged-in artist ID
    return "12345";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset form
    setName("");
    setPrice("");
    setCategory("");
    setSelectedFile(null);
  };

  if (!user) {
    return (
      <>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="container">
          <h3 className="view">Please sign in to view blog. &#128519;</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="j-flex">
          <div className="image_flex">
            <img
              src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/image-placeholder-84@1x.png"
              alt=""
            />
          </div>
          <form onSubmit={handleSubmit} className="blog_form">
            <h1 className="blog_head_text">Create your NFT</h1>
            <br />
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                className="input_css"
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                className="input_css"
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                className="input_css"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Category1">Category 1</option>
                <option value="Category2">Category 2</option>
                <option value="Category3">Category 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fileInput" className="custom-file-input">
                Upload File
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept=".jpg, .png, .gif"
              />
              {selectedFile && (
                <p className="file-name">Selected file: {selectedFile.name}</p>
              )}
            </div>
            <input
              type="hidden"
              id="artistId"
              value={getLoggedInArtistId()}
              readOnly
            />
            <button type="submit" className="btn blog_btn">
              Create NFT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Blog;
