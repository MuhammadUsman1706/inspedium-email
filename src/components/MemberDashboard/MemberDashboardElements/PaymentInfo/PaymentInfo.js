import React, { useEffect } from "react";
import CardsList from "./PaymentInfoElements/CardsList";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import cardBackground from "../../../../assets/images/cardBackground.png";
import VisaLogo from "../../../../assets/images/VisaLogo.png";
import AmExLogo from "../../../../assets/images/AmExLogo.png";
import MastercardLogo from "../../../../assets/images/MastercardLogo.png";
import otherLogo from "../../../../assets/images/otherLogo.png";

import classes from "./PaymentInfo.module.css";
import AddCardButton from "./PaymentInfoElements/AddCardButton";

let requestOptions;

const PaymentInfo = ({
  paymentInfo,
  setPaymentInfo,
  disable,
  information,
  selectedCardIndex,
  setSelectedCardIndex,
}) => {
  const auth = useSelector((state) => state.auth);

  const removeCardHandler = () => {
    const formData = new FormData();
    formData.append("cardID", paymentInfo.id);
    requestOptions.method = "POST";
    requestOptions.body = formData;

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
              setPaymentInfo(null);
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

  useEffect(() => {
    if (!paymentInfo) {
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      myHeaders.append("uuid", `${auth.id}`);
      myHeaders.append("customer", `${auth.stripe_id}`);

      requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("https://api.inspedium.email/card-info", requestOptions).then(
        (response) =>
          response.json().then((responseData) => {
            setPaymentInfo(responseData.data);
          })
        // .then((responseData) =>
        //   setPaymentInfo([
        //     {
        //       id: "pm_1Mg3Q42eZvKYlo2CgOsVS537",
        //       object: "payment_method",
        //       billing_details: {
        //         address: {
        //           city: null,
        //           country: null,
        //           line1: null,
        //           line2: null,
        //           postal_code: null,
        //           state: null,
        //         },
        //         email: null,
        //         name: null,
        //         phone: null,
        //       },
        //       card: {
        //         brand: "mastercard",
        //         checks: {
        //           address_line1_check: null,
        //           address_postal_code_check: null,
        //           cvc_check: "pass",
        //         },
        //         country: "US",
        //         exp_month: 8,
        //         exp_year: 2023,
        //         fingerprint: "7a9bk9ncM08SXfua",
        //         funding: "credit",
        //         generated_from: null,
        //         last4: "4444",
        //         networks: {
        //           available: ["mastercard"],
        //           preferred: null,
        //         },
        //         three_d_secure_usage: {
        //           supported: true,
        //         },
        //         wallet: null,
        //       },
        //       created: 1677491696,
        //       customer: null,
        //       livemode: false,
        //       metadata: {
        //         order_id: "6735",
        //       },
        //       type: "card",
        //     },
        //     {
        //       id: "pm_1Mg3Q42eZvKYlo2CgOsVS537",
        //       object: "payment_method",
        //       billing_details: {
        //         address: {
        //           city: null,
        //           country: null,
        //           line1: null,
        //           line2: null,
        //           postal_code: null,
        //           state: null,
        //         },
        //         email: null,
        //         name: null,
        //         phone: null,
        //       },
        //       card: {
        //         brand: "mastercard",
        //         checks: {
        //           address_line1_check: null,
        //           address_postal_code_check: null,
        //           cvc_check: "pass",
        //         },
        //         country: "US",
        //         exp_month: 8,
        //         exp_year: 2023,
        //         fingerprint: "7a9bk9ncM08SXfua",
        //         funding: "credit",
        //         generated_from: null,
        //         last4: "4444",
        //         networks: {
        //           available: ["mastercard"],
        //           preferred: null,
        //         },
        //         three_d_secure_usage: {
        //           supported: true,
        //         },
        //         wallet: null,
        //       },
        //       created: 1677491696,
        //       customer: null,
        //       livemode: false,
        //       metadata: {
        //         order_id: "6735",
        //       },
        //       type: "card",
        //     },
        //     {
        //       id: "pm_1Mg3Q42eZvKYlo2CgOsVS537",
        //       object: "payment_method",
        //       billing_details: {
        //         address: {
        //           city: null,
        //           country: null,
        //           line1: null,
        //           line2: null,
        //           postal_code: null,
        //           state: null,
        //         },
        //         email: null,
        //         name: null,
        //         phone: null,
        //       },
        //       card: {
        //         brand: "mastercard",
        //         checks: {
        //           address_line1_check: null,
        //           address_postal_code_check: null,
        //           cvc_check: "pass",
        //         },
        //         country: "US",
        //         exp_month: 8,
        //         exp_year: 2023,
        //         fingerprint: "7a9bk9ncM08SXfua",
        //         funding: "credit",
        //         generated_from: null,
        //         last4: "4444",
        //         networks: {
        //           available: ["mastercard"],
        //           preferred: null,
        //         },
        //         three_d_secure_usage: {
        //           supported: true,
        //         },
        //         wallet: null,
        //       },
        //       created: 1677491696,
        //       customer: null,
        //       livemode: false,
        //       metadata: {
        //         order_id: "6735",
        //       },
        //       type: "card",
        //     },
        //   ])
        // )
      );
    }
  }, [paymentInfo]);

  // const loadNextHandler = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const result = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     redirect: "if_required",
  //     confirmParams: {
  //       // FROM REDUX
  //       // receipt_email: props.authData.email,
  //     },
  //   });

  //   if (result.error) {
  //     // Show error to your customer (for example, payment details incomplete)
  //     console.log("ERROR:", result.error.message);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //     navigate("/");
  //   }
  // };
  // console.log(paymentInfo);

  return (
    <div className={classes["payment-info"]}>
      {information &&
        (paymentInfo?.length > 0 ? (
          <section
            className={`${classes["credit-card"]} ${
              disable ? classes.disable : classes.active
            }`}
          >
            <div className={classes["card-image"]}>
              <img loading="lazy" src={cardBackground} title="Credit Card" />
            </div>
            <header className={classes["credit-card-header"]}>
              <h2>{paymentInfo ? "Credit Card" : "Loading..."}</h2>
              {/* {paymentInfo[selectedCardIndex]?.brand && ( */}
              <img
                src={
                  paymentInfo[selectedCardIndex]?.brand === "visa"
                    ? VisaLogo
                    : paymentInfo[selectedCardIndex]?.brand === "mastercard"
                    ? MastercardLogo
                    : paymentInfo[selectedCardIndex]?.brand === "amex"
                    ? AmExLogo
                    : otherLogo
                }
                style={{ height: "100%" }}
              />
              {/* )} */}
            </header>
            <main className={classes["credit-card-details"]}>
              {/* <h2 className={!paymentInfo?.name && classes["no-card-danger"]}> */}
              <h2>{paymentInfo[selectedCardIndex]?.name}</h2>
              <div id={classes["card-number"]}>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>{paymentInfo[selectedCardIndex]?.last4}</span>
              </div>
            </main>
            <footer className={classes["credit-card-footer"]}>
              <p>Valid Till</p>
              <p>
                {paymentInfo[selectedCardIndex]?.exp_month +
                  " / " +
                  paymentInfo[selectedCardIndex]?.exp_year}
              </p>
            </footer>
          </section>
        ) : (
          <section
            className={`${classes["credit-card"]} ${
              disable ? classes.disable : classes.active
            }`}
          >
            <div className={classes["card-image"]}>
              <img loading="lazy" src={cardBackground} title="Credit Card" />
            </div>
            <header className={classes["credit-card-header"]}>
              <h2>{paymentInfo ? "Credit Card" : "Loading..."}</h2>
              {/* {paymentInfo[selectedCardIndex]?.brand && ( */}
              <img src={VisaLogo} style={{ height: "100%" }} />
              {/* )} */}
            </header>
            <main className={classes["credit-card-details"]}>
              <h2 className={classes["no-card-danger"]}>
                {paymentInfo && "No Card Found"}
              </h2>
              <div id={classes["card-number"]}>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>****</span>
              </div>
            </main>
            <footer className={classes["credit-card-footer"]}>
              <p>Valid Till</p>
              <p>- / -</p>
            </footer>
          </section>
        ))}

      <CardsList
        paymentInfo={paymentInfo}
        setPaymentInfo={setPaymentInfo}
        selectedCardIndex={selectedCardIndex}
        setSelectedCardIndex={setSelectedCardIndex}
      />

      <AddCardButton setPaymentInfo={setPaymentInfo} />
      <br />

      {/* <div className={classes["other-cards"]}>
        <h2>Other Cards</h2>
        <ul className={classes["card-list"]}>
          {paymentInfo.map((card) => (
            <li>
              <input type="radio" id={card.id} name="selectedCardIndex" />
              <label htmlFor={card.id}>Ending in {card?.last4}</label>
            </li>
          ))}
        </ul>
      </div> */}
      {/* {cardRemoval && paymentInfo?.id && (
        <button
          onClick={removeCardHandler}
          style={{ marginTop: "1rem" }}
          className="color-button"
        >
          Remove Card
        </button>
      )} */}
      {/* <section className={classes["card-detail-change"]}>
        <button
          onClick={() => setShowUpdate((prevState) => !prevState)}
          className="color-button"
        >
          Update
        </button>
        {showUpdate && (
          <form className={classes["change-form"]} onSubmit={loadNextHandler}>
            <PaymentElement />
            <button className="color-button">Save Changes</button>
          </form>
        )}
      </section> */}
    </div>
  );
};

export default PaymentInfo;
