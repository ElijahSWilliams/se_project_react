import { useContext, useState } from "react";
import "./ToggleSwitch.css";
import currentTempUnitContext from "../../Context/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTempUnit, handleToggleUnit } = useContext(
    currentTempUnitContext
  );

  console.log(currentTempUnit);

  return (
    <label className="toggle-switch">
      <input type="checkbox" className="switch" onChange={handleToggleUnit} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__f"
            : "switch__slider switch__c"
        }
      ></span>
      <p
        className={`switch__temp-f ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-c ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
