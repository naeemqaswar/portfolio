import React, { useEffect, useState } from "react";

import AppContext from "./Context";
import Home from "./containers/Home/index";
import DetailsPopup from "./components/DetailsPopup";
import { IPortfolio } from "./types";

function App() {
  const [popupContent, setPopupContent] = useState(undefined);
  const [portfolio, setPortfolio] = useState<IPortfolio | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {});

  useEffect(() => {
    fetch(process.env.REACT_APP_PORTFOLIO_API!)
      .then(async (response: Response) => {
        setPortfolio(await response.json());
        _hideLoader();
      })
      .catch(() => _hideLoader());
  }, []);

  const _hideLoader = () => {
    const el = document.querySelector(".loading-container");
    if (el) el.remove();
  };

  return (
    <AppContext.Provider
      value={{
        popupContent,
        setPopupContent,
        portfolio,
        setPortfolio,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {typeof popupContent == "object" ? (
        <DetailsPopup
          display={typeof popupContent == "object"}
          details={popupContent}
          hide={() => setPopupContent(undefined)}
        />
      ) : (
        <div />
      )}
      <Home />
    </AppContext.Provider>
  );
}

export default App;
