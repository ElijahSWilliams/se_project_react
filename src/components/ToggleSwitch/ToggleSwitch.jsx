import { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const [currentUnit, setCurrentUnit] = useState("C");

  function handleClick(e) {
    setCurrentUnit(currentUnit === "C" ? "F" : "C");
  }
  console.log(currentUnit);

  return (
    <label className="toggle-switch">
      <input type="checkbox" className="switch" onChange={handleClick} />
      <span
        className={
          currentUnit === "F"
            ? "switch__slider switch__f"
            : "switch__slider switch__c"
        }
      ></span>
      <p
        className={`switch__temp-f ${currentUnit === "F" && "switch__active"}`}
      >
        F
      </p>
      <p
        className={`switch__temp-c ${currentUnit === "C" && "switch__active"}`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
