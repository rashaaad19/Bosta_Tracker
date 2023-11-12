import classes from "./HomeApp.module.css";
import { useContext } from "react";
import { currentLanguage } from "../../context/languageContext";

const HomeApp = () => {
  const { lang } = useContext(currentLanguage);

  return (
    <>
      <section
        className={`${classes.heroContainer} ${
          lang === "عربي" ? classes.containerAR : classes.containerEN
        }`}
      >
        <div
          className={`${classes.heroContent} ${
            lang === "عربي" ? classes.contentAR : classes.contentEN
          }`}
        >
          <h1>
            {lang === "عربي"
              ? "انضم إلى جيل جديد من الخدمات اللوجستية!"
              : "Join A New Generation Of Logistics!"}
          </h1>
          <p>
            {lang === "عربي"
              ? "إعادة تعريف كيفية الشحن، التتبع، التحصيل، والتوصيل، كل ذلك من خلال حلول تكنولوجية مبتكرة وعمليات فعّالة."
              : "Redefining how you ship, track, collect, deliver all through innovative tech-solutions and efficient operations."}
          </p>
          <button>
            <span>{lang === "عربي" ? "ابدأ الأن" : "Start Now"}</span>
          </button>
        </div>
        <img
          src="/public/assets/images/New entries-bro.png"
          alt="delivery man"
        />
      </section>
    </>
  );
};

export default HomeApp;
