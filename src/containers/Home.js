import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Offer from "./Offer";

const Home = () => {
  const [offres, setOffres] = useState([]);
  const [searchTitle, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://leboncoin-api.herokuapp.com/api/offer/with-count")
      .then(response => response.json())
      .then(data => {
        //console.log(data.offers);
        setOffres(data.offers);
      });
  }, []);

  const Search = e => {
    e.preventDefault();
    console.log("in Search function for", searchTitle);
    let searchTitleQueryString;
    if (searchTitle !== null) {
      searchTitleQueryString = `title=${searchTitle}`;
      console.log(
        "build query search",
        `https://leboncoin-api.herokuapp.com/api/offer/with-count?${searchTitleQueryString}`
      );
    }
    fetch(`https://leboncoin-api.herokuapp.com/api/offer/with-count?${searchTitleQueryString}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setOffres(data.offers);
      });
    // https://leboncoin-api.herokuapp.com/api/offer/with-count?title=ordinateur
  };

  console.log("[In Home component (list of offers)]");

  return (
    <div>
      <form
        className="searchEngine"
        onSubmit={e => {
          Search(e);
        }}
      >
        <input
          type="text"
          placeholder="Que recherchez-vous ?"
          value={searchTitle}
          onChange={e => {
            setSearchText(e.target.value);
          }}
        />{" "}
        <button type="submit">Rechercher</button>
      </form>
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
