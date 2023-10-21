import React from "react";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import classes from "./CardsList.module.css";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const CardsList = ({
  selectedCardIndex,
  setSelectedCardIndex,
  paymentInfo,
  setPaymentInfo,
}) => {
  const auth = useSelector((state) => state.auth);

  const removeCardHandler = (id) => {
    if (paymentInfo.length < 2) {
      toast.error("Dear User, you cannot remove your only card.");
      return;
    }

    var headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Authorization", "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75");
    headers.append("uuid", `${auth.id}`);
    headers.append("customer", `${auth.stripe_id}`);

    const body = new FormData();
    body.append("cardID", id);

    const requestOptions = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    confirmAlert({
      title: "Confirm Card Removal",
      message:
        "Are you sure you want to remove your card? Please note that all subscriptions will be deleted along with your email account data.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetch(
              "https://api.inspedium.email/card-remove",
              requestOptions
            );

            if (response.ok) {
              toast.success("Card removed successfully!");
              setPaymentInfo(paymentInfo.filter((card) => card.id !== id));
            } else {
              toast.error("Card removal failed!");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Accordion
      sx={{ minWidth: "max-content" }}
      className={classes["other-cards"]}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes["acc-summary"]}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            marginBottom: 0,
          }}
        >
          Cards
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul className={classes["card-list"]}>
          {paymentInfo?.length > 0 ? (
            paymentInfo.map((card, index) => (
              <li
                className={
                  selectedCardIndex === index && classes["active-list-item"]
                }
              >
                <div
                  onClick={() => setSelectedCardIndex(index)}
                  className={classes.inline}
                >
                  <input
                    type="radio"
                    id={card.id}
                    name="selectedCardIndex"
                    checked={selectedCardIndex === index}
                  />
                  <label htmlFor={card.id}>
                    **** **** **** {card?.last4} &nbsp;
                    <span>
                      Expiration Date: {card.exp_month} / {card.exp_year}
                    </span>
                  </label>
                </div>
                <button
                  style={{
                    margin: "0 1rem 0 0",
                  }}
                  className={
                    selectedCardIndex === index
                      ? "color-inverse-button"
                      : "color-button"
                  }
                  onClick={() => removeCardHandler(card.id)}
                >
                  Remove Card
                </button>
              </li>
            ))
          ) : (
            <li>
              <div className={classes.inline}>
                <p>No Card(s) found</p>
              </div>
            </li>
          )}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default CardsList;
