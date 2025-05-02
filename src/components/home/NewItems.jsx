import React, { useState, useEffect } from "react";
import axios from "axios";
import NewItemsSlider from "../NewItemsSlider";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="col-lg-12">
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft__item">
                      <Skeleton width="100%" height="200px" borderRadius="8px" />
                      <div className="nft__item_info">
                        <Skeleton width="80%" height="20px" borderRadius="4px" />
                        <Skeleton width="60%" height="20px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <NewItemsSlider collections={items} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
