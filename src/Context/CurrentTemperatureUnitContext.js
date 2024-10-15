import React from "react";

const CurrentTempUnitContext = React.createContext({
  currentTempUnit: "",
  handleToggleUnit: () => {},
});

export default CurrentTempUnitContext;
