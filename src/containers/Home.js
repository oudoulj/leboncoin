import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Offer from "./Offer";

const Home = () => {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    fetch("https://leboncoin-api.herokuapp.com/api/offer/with-count")
      .then(response => response.json())
      .then(data => {
        console.log(data.offers);
        setOffres(data.offers);
      });
  }, []);

  return (
    <div>
      <ul>
        {offres !== null
          ? offres.map(o => (
              <Link to={`/offer/${o._id}`} key={o._id} className="offerPanel">
                <div className="offerPicture">
                  <img src={o.pictures[0]} width="200" height="150" alt="" />
                </div>
                <div className="offerTitlePrice">
                  <div className="offerTitle">{o.title}</div>
                  <div className="offerPrice">{o.price} €</div>
                </div>
              </Link>
              //   <div key={o._id} className="offerPanel" onClick={() => console.log("show offer details", o._id)}>
              //     <div className="offerPicture">
              //       <img src={o.pictures[0]} width="200" height="150" alt="" />
              //     </div>
              //     <div className="offerTitlePrice">
              //       <div className="offerTitle">{o.title}</div>
              //       <div className="offerPrice">{o.price} €</div>
              //     </div>
              //   </div>
            ))
          : "Chargement..."}
      </ul>
    </div>
  );
};

export default Home;
