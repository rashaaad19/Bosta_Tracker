import Trackbar from "../../components/TrackBar";
import classes from "./ShipmentApp.module.css";
import { useContext, useEffect, useState } from "react";
//importing context
import { currentLanguage } from "../../context/languageContext";
import { currentStatusContext } from "../../context/statusContext";
import { shipmentNumber } from "../../context/trackNumberContext";
import {
  currentStatusObject,
  stateMapping,
  hubMapping,
  currentStatusObjectEN,
  stateMappingEN,
  hubMappingEN,
} from "../../data/translatedData";
const ShipmentApp = () => {
  const [extractedData, setExtractedData] = useState([]);
  //context states
  const [currentStatus, setCurrentStatus] = useState();
  const [currentStatusEN, setCurrentStatusEN] = useState();
  const [shipmentDetails, setShipmentDetails] = useState();

  const { lang } = useContext(currentLanguage);
  const { trackingId } = useContext(shipmentNumber);

  useEffect(() => {
    //fetching data from the tracking api using fetch api
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://tracking.bosta.co/shipments/track/${trackingId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        let shipmentJourney = [];
        const encounteredStates = {};
        let lastHub = null;

        //assigning the new translated objects to the array shipmentJourney

        if (data.TransitEvents && Array.isArray(data.TransitEvents)) {
          shipmentJourney = data.TransitEvents.map((x) => {
            const translatedState = stateMapping[x.state] || x.state;
            const translatedHub = hubMapping[x.hub] || x.hub;
            const timestampDate = new Date(x.timestamp);
            const translatedStateEN = stateMappingEN[x.state] || x.state;
            const translatedHubEN = hubMappingEN[x.hub] || x.hub;

            // Check if this state has been encountered before
            if (!encounteredStates[translatedState]) {
              // Include the state in the result only if it's the first occurrence
              encounteredStates[translatedState] = true;
              lastHub = translatedHub || lastHub;

              return {
                state: translatedState,
                timestamp: timestampDate.toLocaleString(),
                hub: lastHub || null,
                stateEN: translatedStateEN,
                hubEN: translatedHubEN || null,
              };
            }

            return null;
          }).filter((entry) => entry !== null);
        }
        //translating additonal data from the json and combining them in one object
        const translatedCurrentStatus =
          currentStatusObject[data.CurrentStatus.state] ||
          data.CurrentStatus.state;
        const translatedCurrentStatusEN =
          currentStatusObjectEN[data.CurrentStatus.state] ||
          data.CurrentStatus.state;
        const timeCurrentStatus = new Date(
          data.CurrentStatus.timestamp
        ).toLocaleString();
        const shipmentNumber = data.TrackingNumber;
        const shipmentProvider = data.provider;
        const estimatedDate = new Date(data.PromisedDate).toLocaleDateString();

        const combinedTranslatedObject = {
          shipmentJourney,
          translatedCurrentStatus,
          timeCurrentStatus,
          shipmentNumber,
          shipmentProvider,
          estimatedDate,
          translatedCurrentStatusEN,
        };
        setExtractedData(combinedTranslatedObject);
        setCurrentStatus(translatedCurrentStatus);
        setCurrentStatusEN(translatedCurrentStatusEN);
        setShipmentDetails(shipmentJourney);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [trackingId]);

  // console.log(extractedData);

  return (
    <>
      <currentStatusContext.Provider
        value={{
          currentStatus,
          setCurrentStatus,
          currentStatusEN,
          setCurrentStatusEN,
          shipmentDetails,
          setShipmentDetails,
        }}
      >
        {/*First Section in the page */}

        <section className={classes.shipmentHeader}>
          <div
            className={`${
              lang === "عربي"
                ? classes.headerContainerAR
                : classes.headerContainerEN
            } ${classes.headerContainer}`}
          >
            <div className={classes.shipmentNumber}>
              <p>
                {lang === "عربي" ? "رقم الشحنة  " : "Shipment Number "}
                {`${extractedData.shipmentNumber}`}
              </p>
              <h1
                style={{
                  color:
                    extractedData.translatedCurrentStatus === "تم تسليم الشحنة"
                      ? "limegreen"
                      : extractedData.translatedCurrentStatus ===
                        "تم استلام الشحنة من عامل التوصيل"
                      ? "orange"
                      : "red",
                }}
              >
                {lang === "عربي"
                  ? `${extractedData.translatedCurrentStatus}`
                  : `${extractedData.translatedCurrentStatusEN}`}
              </h1>
            </div>
            <div className={classes.shipmentUpdate}>
              <p>{lang === "عربي" ? "اخر تحديث" : "Last Update"}</p>
              <h1>{`${extractedData.timeCurrentStatus}`}</h1>
            </div>
            <div className={classes.shipmentSeller}>
              <p>{lang === "عربي" ? "اسم التاجر" : "Seller Name"}</p>
              <h1>{`${extractedData.shipmentProvider}`}`</h1>
            </div>
            <div className={classes.shipmentArrival}>
              <p>
                {lang === "عربي" ? "موعد التسليم" : "Estimated Delivery Date"}
              </p>
              <h1>{`${extractedData.estimatedDate}`}</h1>
            </div>
          </div>
          <hr />
          <Trackbar />
        </section>

        {/* Second Section in the page*/}

        <section className={classes.shipmentData}>
          <div
            className={`${
              lang === "عربي"
                ? classes.shipmentDetailsAR
                : classes.shipmentDetailsEN
            } ${classes.shipmentDetails}`}
          >
            <div
              className={`${
                lang === "عربي"
                  ? classes.addressDetailsAR
                  : classes.addressDetailsEN
              }`}
            >
              <h2>{lang === "عربي" ? "عنوان التسليم" : "Delivery address"}</h2>
              <p>
                {lang === "عربي"
                  ? "امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 22 - القاهرة"
                  : "Imbaba, Talaat Harb Street, City of Workers, near Al-Prince, House 17, Block 22, Cairo"}
              </p>
              <div className={classes.addressProblem}>
                <div className={classes.report}>
                  <p>
                    {lang === "عربي"
                      ? "هل يوجد مشكلة في شحنتك!؟"
                      : "Do You have problems with your shipment!?"}
                  </p>
                  <a>{lang === "عربي" ? "إبلاغ عن مشكلة" : "Report Problem"}</a>
                </div>
                <img src="/assets/images/Questions-pana.png" alt="problems" />
              </div>
            </div>
            <table>
              <caption
                className={`${
                  lang === "عربي"
                    ? classes.tableHeaderAR
                    : classes.tableHeaderEN
                }`}
              >
                {lang === "عربي" ? "تفاصيل الشحنة" : "Shipment Details"}
              </caption>
              {extractedData.shipmentJourney &&
                extractedData.shipmentJourney.length > 0 && (
                  <tbody
                    className={`${
                      lang === "عربي"
                        ? classes.tableHeaderAR
                        : classes.tableHeaderEN
                    }`}
                  >
                    <tr>
                      <th> {lang === "عربي" ? "تفاصيل " : " Details"}</th>
                      <th> {lang === "عربي" ? "الوقت" : "Time"}</th>
                      <th> {lang === "عربي" ? "التاريخ" : "Date"}</th>
                      <th> {lang === "عربي" ? "الفرع" : "Branch"}</th>
                    </tr>
                    {extractedData.shipmentJourney.find(
                      (x) => x.state === "تم إنشاء الشحنة"
                    ) && (
                      <tr>
                        <td>
                          {`${
                            lang === "عربي"
                              ? extractedData.shipmentJourney.find(
                                  (x) => x.state === "تم إنشاء الشحنة"
                                )?.state || "Not Found"
                              : extractedData.shipmentJourney.find(
                                  (x) => x.stateEN === "Ticket Created"
                                )?.stateEN || "Not Found"
                          }`}
                        </td>
                        <td>
                          {`${
                            extractedData.shipmentJourney.find(
                              (x) => x.state === "تم إنشاء الشحنة"
                            )?.timestamp
                              ? new Date(
                                  extractedData.shipmentJourney.find(
                                    (x) => x.state === "تم إنشاء الشحنة"
                                  ).timestamp
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }) || "Not Found"
                              : "Not Found"
                          }`}
                        </td>
                        <td>
                          {`${
                            extractedData.shipmentJourney.find(
                              (x) => x.state === "تم إنشاء الشحنة"
                            )?.timestamp
                              ? new Date(
                                  extractedData.shipmentJourney.find(
                                    (x) => x.state === "تم إنشاء الشحنة"
                                  ).timestamp
                                ).toLocaleDateString() || "Not Found"
                              : "Not Found"
                          }`}
                        </td>
                        <td>
                          {`${
                            extractedData.shipmentJourney.find(
                              (x) => x.state === "تم إنشاء الشحنة"
                            )?.hub || ""
                          }`}
                        </td>
                      </tr>
                    )}
                    {/*check if the shipment is recieved by the merchant , based on that renders the next rows */}
                    {extractedData.shipmentJourney.find(
                      (x) => x.state === " تم إستلام الشحنة من التاجر"
                    ) && (
                      <>
                        {/*?. is a chaining operator to throw undefined in case state not found
                      other than giving error
                      */}
                        <tr>
                          <td>
                            {`${
                              lang === "عربي"
                                ? extractedData.shipmentJourney.find(
                                    (x) =>
                                      x.state === " تم إستلام الشحنة من التاجر"
                                  )?.state
                                : extractedData.shipmentJourney.find(
                                    (x) => x.stateEN === " Package Received"
                                  )?.stateEN || "Not Found"
                            }`}
                          </td>
                          <td>
                            {`${
                              extractedData.shipmentJourney.find(
                                (x) => x.state === " تم إستلام الشحنة من التاجر"
                              )?.timestamp
                                ? new Date(
                                    extractedData.shipmentJourney.find(
                                      (x) =>
                                        x.state ===
                                        " تم إستلام الشحنة من التاجر"
                                    ).timestamp
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }) || "Not Found"
                                : "Not Found"
                            }`}
                          </td>
                          <td>
                            {`${
                              extractedData.shipmentJourney.find(
                                (x) => x.state === " تم إستلام الشحنة من التاجر"
                              )?.timestamp
                                ? new Date(
                                    extractedData.shipmentJourney.find(
                                      (x) =>
                                        x.state ===
                                        " تم إستلام الشحنة من التاجر"
                                    ).timestamp
                                  ).toLocaleDateString() || "Not Found"
                                : "Not Found"
                            }`}
                          </td>
                          <td>
                            {`${
                              extractedData.shipmentJourney.find(
                                (x) => x.state === " تم إستلام الشحنة من التاجر"
                              )?.hub || ""
                            }`}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {`${
                              lang === "عربي"
                                ? extractedData.shipmentJourney.find(
                                    (x) => x.state === "الشحنة خرجت للتسليم"
                                  )?.state
                                : extractedData.shipmentJourney.find(
                                    (x) => x.stateEN === "Out for delivery"
                                  )?.stateEN || "Not Found"
                            }`}
                          </td>
                          <td>
                            {`${
                              extractedData.shipmentJourney.find(
                                (x) => x.state === "الشحنة خرجت للتسليم"
                              )?.timestamp
                                ? new Date(
                                    extractedData.shipmentJourney.find(
                                      (x) => x.state === "الشحنة خرجت للتسليم"
                                    ).timestamp
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }) || "Not Found"
                                : "Not Found"
                            }`}
                          </td>
                          <td>
                            {`${
                              extractedData.shipmentJourney.find(
                                (x) => x.state === "الشحنة خرجت للتسليم"
                              )?.timestamp
                                ? new Date(
                                    extractedData.shipmentJourney.find(
                                      (x) => x.state === "الشحنة خرجت للتسليم"
                                    ).timestamp
                                  ).toLocaleDateString() || "Not Found"
                                : "Not Found"
                            }`}
                          </td>
                          <td>
                            {`${
                              extractedData.shipmentJourney.find(
                                (x) => x.state === "الشحنة خرجت للتسليم"
                              )?.hub || ""
                            }`}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td>
                        {`${
                          (lang === "عربي"
                            ? extractedData.shipmentJourney.find(
                                (x) =>
                                  x.state === "تم تسليم الشحنة" ||
                                  x.state === "تم إلغاء الشحنة" ||
                                  x.state === "انتظار تحرك العميل"
                              )?.state || "Not Found"
                            : extractedData.shipmentJourney.find(
                                (x) =>
                                  x.stateEN === "Delivered" ||
                                  x.stateEN === "Shipment Canceled" ||
                                  x.stateEN === "Waiting for customer action"
                              )?.stateEN) || "Not Found"
                        }`}
                      </td>
                      <td>
                        {`${
                          extractedData.shipmentJourney.find(
                            (x) =>
                              x.state === "تم تسليم الشحنة" ||
                              x.state === "تم إلغاء الشحنة" ||
                              x.state === "انتظار تحرك العميل"
                          )?.timestamp
                            ? new Date(
                                extractedData.shipmentJourney.find(
                                  (x) =>
                                    x.state === "تم تسليم الشحنة" ||
                                    x.state === "تم إلغاء الشحنة" ||
                                    x.state === "انتظار تحرك العميل"
                                ).timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              }) || "Not Found"
                            : "Not Found"
                        }`}
                      </td>
                      <td>
                        {`${
                          extractedData.shipmentJourney.find(
                            (x) =>
                              x.state === "تم تسليم الشحنة" ||
                              x.state === "تم إلغاء الشحنة" ||
                              x.state === "انتظار تحرك العميل"
                          )?.timestamp
                            ? new Date(
                                extractedData.shipmentJourney.find(
                                  (x) =>
                                    x.state === "تم تسليم الشحنة" ||
                                    x.state === "تم إلغاء الشحنة" ||
                                    x.state === "انتظار تحرك العميل"
                                ).timestamp
                              ).toLocaleDateString() || "Not Found"
                            : "Not Found"
                        }`}
                      </td>
                      <td>
                        {`${
                          extractedData.shipmentJourney.find(
                            (x) =>
                              x.state === "تم تسليم الشحنة" ||
                              x.state === "تم إلغاء الشحنة" ||
                              x.state === "انتظار تحرك العميل"
                          )?.hub || ""
                        }`}
                      </td>
                    </tr>
                  </tbody>
                )}
            </table>
          </div>
        </section>
      </currentStatusContext.Provider>
    </>
  );
};

export default ShipmentApp;
