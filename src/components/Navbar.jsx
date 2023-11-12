import classes from "./Navbar.module.css";

import { useContext, useState } from "react";
import { currentLanguage } from "../context/languageContext";

import { Link } from "react-router-dom";
const Navbar = () => {
  const [navbarLang, setNavbarLang] = useState("EN");
  //using context to handle language change
  const { setLang, lang } = useContext(currentLanguage);

  const clickHandler = () => {
    if (lang === "عربي") {
      setLang("EN");
      setNavbarLang("عربي");
    } else {
      setLang("عربي");
      setNavbarLang("EN");
    }
  };
  console.log(lang);

  return (
    <>
      <header>
        <nav>
          <ul
            className={`${
              lang === "عربي" ? classes.navbarAR : classes.navbarEN
            } ${classes.navbar}`}
          >
            <li>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <img src="/assets/images/bosta-logo.png" alt="bosta" />
              </Link>
            </li>
            <div></div>
            <li className={classes.container}>
              <Link
                to={"/search"}
                style={{ textDecoration: "none" }}
                className={classes.track}
              >
                {navbarLang === "EN" ? "تتبع شحنتك" : "Track Your Shipment"}
              </Link>
              <button onClick={clickHandler}>{navbarLang}</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
