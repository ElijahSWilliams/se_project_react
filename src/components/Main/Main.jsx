import { useState } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import currentTempUnitContext from "../../Context/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick }) {
  const { currentTempUnit } = useContext(currentTempUnitContext);
  /* console.log(currentTempUnit); */
  console.log("WeatherData:", weatherData);
  const tempVar = weatherData?.temperature?.[currentTempUnit] || 999;
  console.log("CurrentTempUnit:", currentTempUnit);
  console.log("tempVar: ", tempVar);

  return (
    <>
      <main>
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="card__text">
            Today is {tempVar}&deg; {currentTempUnit} / You may want to wear:
          </p>
          <ul className="cards__list">
            {defaultClothingItems
              .filter((item) => {
                //filter item based on weather type, hot cold etc.
                return item.weather === weatherData.type; //item.weather should equal weatherData.type value
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick} //passed from App componenet to Main Then to ItemCard while renaming to 'onCardClick'
                  />
                );
              })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
