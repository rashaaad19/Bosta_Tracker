import classes from "./Searchbar.module.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shipmentNumber } from "../context/trackNumberContext";

const Searchbar = () => {
  const { setTrackingId } = useContext(shipmentNumber);
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState();
  //using useNavigate
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(searchTerm);
      if (
        searchTerm == 67151313 ||
        searchTerm == 7234258 ||
        searchTerm == 13737343
      ) {
        setTrackingId(searchTerm);
        //   Navigate to the "tracking" path
        navigate("/tracking");
        setShowError(false)
      }
      else setShowError(true)
    }
  };
  return (
    <>
      <div className={classes.container}>
        <h1>Track Your Shipment</h1>
        <input
          type="text"
          placeholder="Tracking No."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleEnterKeyPress}
          className={classes.searchBar}
        />
        {showError&&<h2>Enter one of these Numbers 67151313, 7234258 or 13737343 </h2>}
      </div>
    </>
  );
};

export default Searchbar;
