import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import currentTempUnitContext from "../../Context/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(currentTempUnitContext);
  const tempVar = weatherData?.temperature?.[currentTempUnit];

  return (
    <>
      <section className="weather-card">
        <p className="weather-card__temp">
          {tempVar}&deg; {currentTempUnit}
        </p>
        <img
          className="weather-card__image"
          src={sunny}
          alt="weather image"
        ></img>
      </section>
    </>
  );
}

export default WeatherCard;
