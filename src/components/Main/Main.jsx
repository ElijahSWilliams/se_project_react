import { useState } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData }) {
  return (
    <>
      <main>
        <WeatherCard />
        <section className="cards">
          <p className="card__text">
            Today is 75&deg; F / You may want to wear:
          </p>
          <ul className="cards__list">
            {defaultClothingItems
              .filter((item) => {
                //filter item based on weather type, hot cold etc.
                return item.weather === weatherData.type; //item.weather should equal weatherData.type value
              })
              .map((item) => {
                return <ItemCard key={item._id} item={item} />;
              })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
