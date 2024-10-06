import React from "react";

const currentTempUnitContext = React.createContext({
  currentTempUnit: "",
  handleToggleUnit: () => {},
});

export default currentTempUnitContext;
