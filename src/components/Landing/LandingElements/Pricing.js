import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPackagesList } from "../../../firebase";
import DoneIcon from "@mui/icons-material/Done";

import classes from "./Pricing.module.css";

const Pricing = () => {
  const businessId = localStorage.getItem("businessId");
  const enterpriseId = localStorage.getItem("enterpriseId");
  const [switchPrice, setSwitchPrice] = useState(false);
  const [packagesList, setPackagesList] = useState(null);
  const servicePerks = [
    "Ad Free",
    "Free File Storage",
    "Adjustable Mail Box Size",
    // "Private Label",
    "Large Attachements : 50GB",
    "Use Your Own Domain",
    "Control Panel",
    "Advance Spam & Virus Filterng",
    "Modern, Easy to Use Webmail",
    "Personal Support",
    "SSL/TTL Encryption",
    "Out of Office & Auto Responder",
    "Message Delivery Rules",
    "Two Factor Authentication",
    "Backup & Archiving",
    "Whitelist & Blacklist",
    "Domain Alias",
    "Forward & User Extensions",
    "Catch, Lists & Aliasis",
    "Forward & User Extensions",
    "Shared Folders",
    "SMTP, POP3, IMAP",
    "E-MAIL, CALENDAR AND CONTACT SYNCHRONIZATION",
    "Shared Calendar",
    "Easy to use Web Mail",
    "Tasks",
    "IMAP Account Consolidation",
    "File Storage",
    "Account Summary",
    "Document Editing",
    "Secure Email",
    "Advance Groupware",
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await getPackagesList();
      setPackagesList(response);
    };
    getData();
  }, []);

  return (
    <div className={classes.pricing}>
      <div className={classes.text}>
        <h1>Our Pricing</h1>
      </div>
      <div className={classes["pricing-cards"]}>
        <div>
          <h4>Business Email</h4>
          {packagesList ? (
            <h1 style={{ display: "inline" }}>
              $
              {switchPrice
                ? packagesList[businessId].price.year.price
                : packagesList[businessId].price.month.price}
            </h1>
          ) : (
            <h1>Loading...</h1>
          )}
          <span> per {switchPrice ? "year" : "month"}</span>
          <p
            style={{ color: "#00505D", fontSize: "0.9rem", fontWeight: "bold" }}
          >
            per mailbox contain 10GB
          </p>
          {packagesList && (
            <Link
              to={
                switchPrice
                  ? `/buynow/${businessId}/year/${packagesList[businessId].price.year.price}`
                  : `/buynow/${businessId}/month/${packagesList[businessId].price.month.price}`
              }
            >
              <button
                style={{ width: "100%", marginTop: "1rem" }}
                className={classes["color-button"]}
              >
                Select
              </button>
            </Link>
          )}
        </div>
        <div>
          <h4>Enterprise Email</h4>
          {packagesList ? (
            <h1 style={{ display: "inline" }}>
              $
              {switchPrice
                ? packagesList[enterpriseId].price.year.price
                : packagesList[enterpriseId].price.month.price}
            </h1>
          ) : (
            <h1>Loading... </h1>
          )}
          <span> per {switchPrice ? "year" : "month"}</span>
          <p
            style={{ color: "#00505D", fontSize: "0.9rem", fontWeight: "bold" }}
          >
            per mailbox contain 10GB
          </p>
          {packagesList && (
            <Link
              to={
                switchPrice
                  ? `/buynow/${enterpriseId}/year/${packagesList[enterpriseId].price.year.price}`
                  : `/buynow/${enterpriseId}/month/${packagesList[enterpriseId].price.month.price}`
              }
            >
              <button
                style={{ width: "100%", marginTop: "1rem" }}
                className={classes["color-button"]}
              >
                Select
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className={classes["pricing-perks"]}>
        <h1 className={classes["main-heading"]}>Email Hosting Plans</h1>
        <p className={classes["para-text"]}>
          Establish an authoritative presence with our <strong>Basic </strong>
          email address plus your domain name—show potential customers you are
          serious about business! You can even establish multiple alias at no
          extra cost.
        </p>
        <p className={classes["para-text"]}>
          For the most streamlined coordination among team members, upgrade to
          the <strong>Enhanced</strong> mailbox and gain access to all the
          essential tools necessary for everyday operations, which sync across
          devices seamlessly.
        </p>
        <div className={classes.switchPeriod}>
          <span>Monthly</span>
          <label class={classes.switch}>
            <input
              type="checkbox"
              onChange={() => setSwitchPrice((prevState) => !prevState)}
            />
            <span class={`${classes.slider} ${classes.round}`}></span>
          </label>
          <span>Yearly</span>
        </div>
        <table cellSpacing={0} className={classes["service-perks-table"]}>
          <tr className={classes["first-row"]}>
            <th className={classes["first-head"]}>
              <h4>Service Perks</h4>
            </th>
            <th>
              <h4>Business Email</h4>
              {packagesList ? (
                <h1 style={{ margin: 0 }}>
                  $
                  {switchPrice
                    ? packagesList[businessId].price.year.price
                    : packagesList[businessId].price.month.price}
                </h1>
              ) : (
                <h1>Loading...</h1>
              )}
              <span> per {switchPrice ? "year" : "month"}</span>
              <p
                style={{
                  color: "#00505D",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                per mailbox contain 10GB
              </p>
            </th>
            <th>
              <h4>Enterprise Email</h4>
              {packagesList ? (
                <h1 style={{ margin: 0 }}>
                  $
                  {switchPrice
                    ? packagesList[enterpriseId].price.year.price
                    : packagesList[enterpriseId].price.month.price}
                </h1>
              ) : (
                <h1>Loading...</h1>
              )}
              <span> per {switchPrice ? "year" : "month"}</span>
              <p
                style={{
                  color: "#00505D",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                per mailbox contain 10GB
              </p>
            </th>
          </tr>
          {servicePerks.map((perk, index) => (
            <tr className={classes["table-row"]}>
              <td>{perk}</td>
              {index < 22 ? (
                <td>
                  <DoneIcon color="success" />
                </td>
              ) : (
                <td>
                  <DoneIcon color="disabled" />
                </td>
              )}
              <td>
                <DoneIcon color="success" />
              </td>
            </tr>
          ))}
          <tfoot className={classes["table-foot"]}>
            <tr>
              <td>Total</td>
              <td>
                {packagesList ? (
                  <h4>
                    $
                    {switchPrice
                      ? packagesList[businessId].price.year.price
                      : packagesList[businessId].price.month.price}
                  </h4>
                ) : (
                  <h4>Loading...</h4>
                )}
                {packagesList && (
                  <Link
                    to={
                      switchPrice
                        ? `/buynow/${businessId}/year/${packagesList[businessId].price.year.price}`
                        : `/buynow/${businessId}/month/${packagesList[businessId].price.month.price}`
                    }
                  >
                    <button className={classes["color-button"]}>Select</button>
                  </Link>
                )}
              </td>
              <td>
                {packagesList ? (
                  <h4>
                    $
                    {switchPrice
                      ? packagesList[enterpriseId].price.year.price
                      : packagesList[enterpriseId].price.month.price}
                  </h4>
                ) : (
                  <h4>Loading...</h4>
                )}
                {packagesList && (
                  <Link
                    to={
                      switchPrice
                        ? `/buynow/${enterpriseId}/year/${packagesList[enterpriseId].price.year.price}`
                        : `/buynow/${enterpriseId}/month/${packagesList[enterpriseId].price.month.price}`
                    }
                  >
                    <button className={classes["color-button"]}>Select</button>
                  </Link>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Pricing;
