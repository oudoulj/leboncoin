import React, { useState, useEffect } from "react";
import avatar from "../avatar.png";

const Offer = props => {
  const [offer, setOffer] = useState(null);
  useEffect(() => {
    fetch(`https://leboncoin-api.herokuapp.com/api/offer/${props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setOffer(data);
      });
  }, [props.match.params.id]);

  return (
    <div>
      {offer !== null ? (
        <div className="offerDetail">
          <div className="offerDetailPictureUsername">
            <div className="offerPicture">
              <img src={offer.pictures[0]} alt="" width="450" height="250" />
            </div>
            <div className="avatarBlock">
              <img src={avatar} alt="" className="avatarPicture" />
              <div className="offerUsername">{offer.creator.account.username}</div>
            </div>
          </div>
          <div className="offerTitle">{offer.title}</div>
          <div className="offerPrice">{offer.price}</div>
          <div>
            Description
            <br />
            {offer.description}
          </div>
        </div>
      ) : (
        "Chargement..."
      )}
      {/* 
      {title}
      {price}
      {description} */}
    </div>
  );
};

export default Offer;
