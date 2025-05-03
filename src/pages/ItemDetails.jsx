import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setItemDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="400px"/>
                ) : ( 
                <img
                src={itemDetail?.nftImage}
                className="img-fluid img-rounded mb-sm-30 nft-image"
                alt=""
              />)}      
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <>
                      <Skeleton width="60%" height="30px" />
                      <Skeleton width="40%" height="20px" />
                    </>
                  ) : (
                    <h2>
                      {itemDetail?.title} #{itemDetail?.tag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                  {loading ? (
                      <>
                        <Skeleton width="80px" height="20px" />
                        <Skeleton width="80px" height="20px" />
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetail?.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetail?.likes}
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                  {loading ? (
                      <Skeleton width="100%" height="80px" />
                    ) : (
                      itemDetail?.description
                    )}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${itemDetail?.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemDetail?.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="20px" />
                          ) : (
                            <Link to={`/author/${itemDetail?.ownerId}`}>
                              {itemDetail?.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${itemDetail?.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemDetail?.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="20px" />
                          ) : (
                            <Link to={`/author/${itemDetail?.creatorId}`}>
                              {itemDetail?.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width="100px" height="20px" />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{itemDetail?.price}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;