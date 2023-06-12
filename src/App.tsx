import React, { useEffect, useState } from "react";

import AppContext from "./Context";
import Home from "./containers/Home/index";
import DetailsPopup from "./components/DetailsPopup";

function App() {
  const [popupContent, setPopupContent] = useState();

  useEffect(() => {
    window.addEventListener("load", _onDOMLoad);
  });

  const _onDOMLoad = () => _hideLoader();

  const _hideLoader = () => {
    const el = document.querySelector(".loading-container");
    if (el) el.remove();
  };

  return (
    <AppContext.Provider value={{ popupContent, setPopupContent }}>
      <DetailsPopup
        display={typeof popupContent == "object"}
        details={popupContent}
        hide={() => setPopupContent(undefined)}
      />
      <Home />
    </AppContext.Provider>
  );
}

export default App;
