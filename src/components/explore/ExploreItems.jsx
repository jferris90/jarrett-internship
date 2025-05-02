import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const filterItems = (event) => {
    const filterValue = event.target.value;

    const sortedItems = [...items];
    if (filterValue === "price_low_to_high") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (filterValue === "price_high_to_low") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (filterValue === "likes_high_to_low") {
      sortedItems.sort((a, b) => b.likes - a.likes);
    }

    setItems(sortedItems);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterItems}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="de_countdown">
                  <Skeleton width="100px" height="20px" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="80%" height="20px" />
                  <Skeleton width="60%" height="20px" />
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt={item.authorName}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown"><Countdown expiryDate={item.expiryDate} /></div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.id}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
      {visibleItems < items.length && (
          <button onClick={loadMoreItems} id="loadmore" className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;