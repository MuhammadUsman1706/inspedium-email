import React, { useState } from "react";
import AddCardModal from "./AddCardModal";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import classes from "./AddCardButton.module.css";

const AddCardButton = ({ setPaymentInfo }) => {
  const auth = useSelector((state) => state.auth);
  const [showCardModal, setShowCardModal] = useState(false);
  const [addCardInformation, setAddCardInformation] = useState(null);

  const onAddCardHandler = async () => {
    setShowCardModal(true);

    if (!addCardInformation) {
      var headers = new Headers();
      headers.append("accept", "application/json");
      headers.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      headers.append("uuid", `${auth.id}`);
      headers.append("customer", `${auth.stripe_id}`);

      const requestOptions = {
        method: "POST",
        headers,
      };

      const response = await fetch(
        "https://api.inspedium.email/card-add",
        requestOptions
      );

      if (response.ok) {
        const responseData = await response.json();
        setAddCardInformation({
          stripePromise: loadStripe(responseData.publishableKey),
          options: { clientSecret: responseData.client_secret },
        });
      }
    }
  };

  return (
    <div className={classes["add-card-button"]}>
      <button
        disabled={showCardModal && !addCardInformation}
        onClick={onAddCardHandler}
        className="color-button"
      >
        {showCardModal && !addCardInformation ? "Please Wait..." : "Add Card"}
      </button>

      {showCardModal && addCardInformation && (
        <Elements
          stripe={addCardInformation.stripePromise}
          options={addCardInformation.options}
        >
          <AddCardModal
            // addCardInformation={addCardInformation}
            setAddCardInformation={setAddCardInformation}
            open={showCardModal}
            setOpen={setShowCardModal}
            setPaymentInfo={setPaymentInfo}
          />
        </Elements>
      )}
    </div>
  );
};

export default AddCardButton;
