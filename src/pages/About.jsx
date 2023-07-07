import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper";
import PL1 from "../media/partner_logo_1.png";
import PL2 from "../media/partner_logo_2.png";
import PL3 from "../media/partner_logo_3.png";
import PL4 from "../media/partner_logo_4.png";
import PL5 from "../media/partner_logo_5.png";
function About() {
  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <h1 className="about_title">About the platform</h1>
        <div className="about_section1">
          <div className="section1_img">
            <img
              src="https://themegenix.net/wp/nerko/wp-content/uploads/2022/12/features-03.png"
              alt=""
              className="img"
            />
          </div>
          <div className="section1_text">
            <h6>create and invest</h6>
            <h2 className="h2">
              Create your <br />
              own NFT
            </h2>
            <p>
              Multiple Chains, One Home. Stack up all your NFTs from across
              blockchains.
            </p>
            <div className="about_fact">
              <div>
                <h3>4,500+</h3>
                <p>
                  Collections Indexed <br />
                  every 5mins.
                </p>
              </div>
              <div>
                <h3>2.5x</h3>
                <p>
                  Difference in Floor & Estimated <br />
                  NFT Value
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider_box">
          <img
            src="https://themegenix.net/nerko/wp-content/uploads/2022/12/divider-01.svg"
            alt=""
            className="divider"
          />
        </div>
        <div className="about_section1_part2">
          <div className="section1_text">
            <h6>SYNC AND TRACK</h6>
            <h2>
              Multiple Chains,
              <br /> One Home
            </h2>
            <p>
              We make it easy to Discover, Invest and manage all your NFTs at
              one place, looked up one of the more obscure.Find the right NFT
              collections to buy within the platform.
            </p>
            <div className="about_fact">
              <div className="icon_box">
                <div className="icon">
                  <i class="fa-regular fa-object-ungroup"></i>
                </div>
                <p>
                  Collections Indexed <br />
                  every 5mins.
                </p>
              </div>
              <div className="icon_box">
                <div className="icon">
                  <i class="fa-regular fa-object-group"></i>
                </div>
                <p>
                  Difference in Floor <br /> & Estimated Value
                </p>
              </div>
            </div>
          </div>
          <div className="section1_img">
            <img
              src=" https://themegenix.net/wp/nerko/wp-content/uploads/2022/12/features-02.png"
              alt=""
            />
          </div>
        </div>
        <div className="divider_box">
          <img src="https://themegenix.net/nerko/wp-content/uploads/2022/12/divider-01.svg" alt="" className="divider" />
        </div>
        <div className="services">
          <div className="services_left">
            <div className="service_title">
              <h6>Powerful services</h6>
              <h3>
                OUR POWERFUL SERVICES <br />
                DONE ON TIME
              </h3>
            </div>
            <div className="service_list">
              <div className="services_item">
                <div className="service_icon">
                  <i class="fa-solid fa-gem"></i>
                </div>
                <h4>Year Experience</h4>
                <p>
                  Lorem ipsum dolor sitamet const adipiscng Duis eletum
                  sollicitudin is yaugue euismods
                </p>
              </div>
              <div className="services_item">
                <div className="service_icon">
                  <i class="fa-regular fa-user"></i>
                </div>
                <h4>Expert Teams</h4>
                <p>
                  Lorem ipsum dolor sitamet const adipiscng Duis eletum
                  sollicitudin is yaugue euismods
                </p>
              </div>
              <div className="services_item">
                <div className="service_icon">
                  <i class="fa-brands fa-ethereum"></i>
                </div>
                <h4>Best NFT Game</h4>
                <p>
                  Lorem ipsum dolor sitamet const adipiscng Duis eletum
                  sollicitudin is yaugue euismods
                </p>
              </div>
              <div className="services_item">
                <div className="service_icon">
                  <i class="fa-solid fa-gear"></i>
                </div>
                <h4>Worldwide Client</h4>
                <p>
                  Lorem ipsum dolor sitamet const adipiscng Duis eletum
                  sollicitudin is yaugue euismods
                </p>
              </div>
            </div>
          </div>
          <div className="services_right">
            <Swiper
              effect={"flip"}
              grabCursor={true}
              pagination={true}
              navigation={true}
              modules={[EffectFlip, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="https://themedox.com/demo/mykd/assets/img/others/services_img03.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://themedox.com/demo/mykd/assets/img/others/services_img01.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://themedox.com/demo/mykd/assets/img/others/services_img02.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/avatar-placeholder-101@2x.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/avatar-placeholder-103@2x.png" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="partner_box">
          <div className="partners">
            <a href="https://www.nft-dao.org/" target="_blank">
              <img src={PL1} alt="partner 1"></img>
            </a>
            <a href="https://www.nft-dao.org/" target="_blank">
              <img src={PL2} alt="partner 2"></img>
            </a>
            <a href="https://www.nft-dao.org/" target="_blank">
              <img src={PL3} alt="partner 3"></img>
            </a>
            <a href="https://www.nft-dao.org/" target="_blank">
              <img src={PL4} alt="partner 4"></img>
            </a>
            <a href="https://www.nft-dao.org/" target="_blank">
              <img src={PL5} alt="partner 5"></img>
            </a>
          </div>
        </div>
        <div className="divider_box">
          <img src="https://themegenix.net/nerko/wp-content/uploads/2022/12/divider-01.svg" alt="" className="divider" />
        </div>
        <div className="about_footer">
          <div className="footer_text">
            <h1>NFT Marketplace</h1>
            <h4>
              We make it easy to Discover, Invest and <br />
              manage all your NFTs at one place.
            </h4>
          </div>
          <ul className="about_social">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
