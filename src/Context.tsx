import React from "react";
import { IAppContext } from "./types";

export default React.createContext<IAppContext>({
  popupContent: undefined,
  setPopupContent: () => {},
  portfolio: undefined,
  setPortfolio: () => {},
});
