import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot">
          <div className="nft_marketplace_info">
            <a className="logo">
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/storefront-2@2x.svg"
                alt=""
              />
              <img
                src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/nft-marketplace-1@2x.svg"
                alt=""
              />
            </a>
            <p>NFT marketplace UI created with Anima for Figma.</p>
            <p>Join our community</p>
            <ul className="web">
              <li>
                <a href="#">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/discordlogo-1@2x.svg"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/youtubelogo-1@2x.svg"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/twitterlogo-1@2x.svg"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/instagramlogo-1@2x.svg"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="explore">
            <h5>Explore</h5>
            <ul>
              <li>
                <a href="#">Marketplace</a>
              </li>
              <li>
                <a href="#">Rankings</a>
              </li>
              <li>
                <a href="#">Connect a wallet</a>
              </li>
            </ul>
          </div>
          <div className="subscribe">
            <h5>Join Our Weekly Digest</h5>
            <p>Get exclusive promotions & updates straight to your inbox.</p>
            <form>
              <input
                type="email"
                name=""
                id="mailFormINPUT"
                placeholder="Enter your email here"
              />
              <button
                id="mailFormBTN"
                onClick={() => {
                  alert("Successful Operation");
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <p id="info_p">Ⓒ NFT Market. Use this template freely.</p>
      </div>
    </footer>
  );
}

export default Footer;
