import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionSlider from "../CollectionSlider";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                  <div className="nft_coll">
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                    <div className="nft_coll_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                    </div>
                    <div className="nft_coll_info">
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
              <CollectionSlider collections={collections} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
