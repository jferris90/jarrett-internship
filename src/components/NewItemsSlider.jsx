import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Countdown from "./Countdown";

const NewItemsSlider = ({ collections }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <button
        className="slider-arrow prev-arrow"
        onClick={() => sliderRef.current.slickPrev()}
      >
        &#8249;
      </button>
      <Slider ref={sliderRef} {...settings}>
        {collections.map((collection, index) => (
          <div key={index} className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${collection.nftId}`}>
                <img
                  src={collection.nftImage || nftImage}
                  className="lazy img-fluid"
                  alt={collection.title || "NFT"}
                />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author/${collection.authorId}`}>
                <img
                  className="lazy pp-coll"
                  src={collection.authorImage || AuthorImage}
                  alt={collection.author || "Author"}
                />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to={`/item-details/${collection.nftId}`}>
                <h4>{collection.title || "Unknown Collection"}</h4>
              </Link>
              
            </div>
            <div className="nft_countdown">
              <Countdown expiryDate={collection.expiryDate} />
            </div>
            <div>
              <div className="nft_end">
                <span>{collection.price || "Unknown Price"} ETH</span>
                <div>
                    <i className="fa fa-heart"></i>
                    <span>{collection.likes || "Unknown Likes"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button
        className="slider-arrow next-arrow"
        onClick={() => sliderRef.current.slickNext()}
      >
        &#8250;
      </button>
    </div>
  );
};

export default NewItemsSlider;