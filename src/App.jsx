import "./App.css";
import Navbar from "./components/Navbar";
import HomeApp from "./pages/Home/HomeApp";
import ShipmentApp from "./pages/Shipment/ShipmentApp";
import { currentLanguage } from "./context/languageContext";
import { shipmentNumber } from "./context/trackNumberContext";
import { useState } from "react";

//react router elements

import { Route, Routes } from "react-router-dom";
import SearchApp from "./pages/Search/SearchApp";
function App() {
  const [lang, setLang] = useState("عربي");
  const [trackingId, setTrackingId] = useState();
  return (
    <>
      <currentLanguage.Provider value={{ lang, setLang }}>
        <shipmentNumber.Provider value={{ trackingId, setTrackingId }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeApp />} />
            <Route path="/tracking" element={<ShipmentApp />} />
            <Route path="/search" element={<SearchApp />}></Route>
          </Routes>
        </shipmentNumber.Provider>
      </currentLanguage.Provider>
    </>
  );
}

export default App;
