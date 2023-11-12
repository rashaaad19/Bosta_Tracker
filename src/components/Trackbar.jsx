import classes from "./Trackbar.module.css";
import { ImCheckmark } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";
import { useContext } from "react";
import { currentStatusContext } from "../context/statusContext";
import { currentLanguage } from "../context/languageContext";
const Trackbar = () => {
  const { currentStatus, shipmentDetails } =
    useContext(currentStatusContext);
  const { lang } = useContext(currentLanguage);
  console.log(shipmentDetails);

  //checking if the details is loaded
  let states;
  if (shipmentDetails && Array.isArray(shipmentDetails)) {
    states = shipmentDetails.map((item) => item.state);
  }

  return (
    <>
      <div className={classes.tracker}>
        <div className={classes.stage}>
          <i
            className={
              (currentStatus === "تم تسليم الشحنة" ||
                currentStatus === "تم إلغاء الشحنة" ||
                currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
              states.includes("تم تسليم الشحنة")
                ? `${classes.delivered}`
                : `${classes.disable}`
            }
          >
            <TbTruckDelivery
              size={20}
              color="white"
              style={{
                position: "relative",
                top: "10%",
                transform: "rotate(180deg) scaleY(-1)",
              }}
            />
          </i>
          <p>{lang === "عربي" ? "تم تسليم الشحنة" : "Delivered"}</p>
        </div>
        <hr
          className={
            (currentStatus === "تم تسليم الشحنة" ||
              currentStatus === "تم إلغاء الشحنة" ||
              currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
            states.includes("تم تسليم الشحنة")
              ? `${classes.delivered}`
              : `${classes.disable}`
          }
          style={{
            transform: "scaleX(1.6)",
            zIndex: "-9999",
            position: "relative",
            bottom: "10px",
            left: "5px",
          }}
        />
        <div
          className={classes.stage}
          style={{ position: "relative", top: "10px" }}
        >
          <i
            className={
              (currentStatus === "تم تسليم الشحنة" ||
                currentStatus === "تم إلغاء الشحنة" ||
                currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
              states.includes("الشحنة خرجت للتسليم")
                ? `${classes.delivered}`
                : `${classes.disable}`
            }
          >
            <ImCheckmark
              size={15}
              color="white"
              style={{ position: "relative", top: "5%" }}
            />
          </i>
          <div>
            <p>
              {lang === "عربي"
                ? "الشحنة خرجت للتسليم"
                : "Shipment is out for delivery"}
            </p>
            <p>
              {lang === "عربي"
                ? "العميل غير متوفر في العوان"
                : "Client is not in address"}
            </p>{" "}
          </div>
        </div>
        <hr
          className={
            (currentStatus === "تم تسليم الشحنة" ||
              currentStatus === "تم إلغاء الشحنة" ||
              currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
            states.includes("الشحنة خرجت للتسليم")
              ? `${classes.delivered}`
              : `${classes.disable}`
          }
          style={{
            transform: "scaleX(1.65)",
            zIndex: "-9999",
            left: "10px",
            position: "relative",
            bottom: "10px",
          }}
        />
        <div className={classes.stage}>
          <i
            className={
              (currentStatus === "تم تسليم الشحنة" ||
                currentStatus === "تم إلغاء الشحنة" ||
                currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
              states.includes(" تم إستلام الشحنة من التاجر")
                ? `${classes.delivered}`
                : `${classes.disable}`
            }
          >
            <ImCheckmark
              size={15}
              color="white"
              style={{ position: "relative", top: "5%" }}
            />
          </i>
          <p>
            {lang === "عربي"
              ? "تم استلام الشحنة من التاجر"
              : "Received shipment from the merchant"}
          </p>
        </div>
        <hr
          className={
            (currentStatus === "تم تسليم الشحنة" ||
              currentStatus === "تم إلغاء الشحنة" ||
              currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
            states.includes(" تم إستلام الشحنة من التاجر")
              ? `${classes.delivered}`
              : `${classes.disable}`
          }
          style={{
            transform: "scaleX(1.51)",
            zIndex: "-9999",
            position: "relative",
            bottom: "10px",
          }}
        />
        <div className={classes.stage}>
          <i
            className={
              (currentStatus === "تم تسليم الشحنة" ||
                currentStatus === "تم إلغاء الشحنة" ||
                currentStatus === "تم استلام الشحنة من عامل التوصيل") &&
              states.includes("تم إنشاء الشحنة")
                ? `${classes.delivered}`
                : `${classes.disable}`
            }
          >
            <ImCheckmark
              size={15}
              color="white"
              style={{ position: "relative", top: "5%" }}
            />
          </i>
          <p>
            {lang === "عربي"
              ? "تم إنشاء الشحنة"
              : "Order Placed"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Trackbar;
