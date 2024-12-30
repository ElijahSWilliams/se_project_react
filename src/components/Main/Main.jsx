import { useState } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
/* import { defaultClothingItems } from "../../utils/constants"; */
import ItemCard from "../ItemCard/ItemCard";
import CurrentTempUnitContext from "../../Context/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const tempVar = weatherData?.temperature?.[currentTempUnit] || 999;
  console.log("ClothingItems in Main: ", { clothingItems });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="card__text">
          Today is {tempVar}&deg; {currentTempUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              //filter item based on weather type, hot cold etc.
              return item.weather === weatherData.type; //item.weather should equal weatherData.type value
            })
            .reverse() //reverse order of cards to display new cards first
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
  );
}

export default Main;
