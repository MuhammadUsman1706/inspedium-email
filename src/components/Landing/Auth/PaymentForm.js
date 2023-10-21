import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { TextField } from "@mui/material";
import ReactGA from "react-ga4";

import classes from "./PaymentForm.module.css";

const PaymentForm = ({
  authData,
  totalPrice,
  setDashboardMenu,
  setRefreshPage,
  setInvoiceInfo,
  selectedDomain,
}) => {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const enterpriseId = localStorage.getItem("enterpriseId");

  const [cardHolderName, setCardHolderName] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNextHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !cardHolderName) {
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      confirmParams: {
        receipt_email: authData.email,
        payment_method_data: {
          billing_details: {
            name: cardHolderName,
          },
        },
        // return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // console.log("ERROR:", result.error.message);
      toast.error(result.error.message);
    } else {
      // console.log(authData.email);
      toast.success("Your payment was successful! Please login now.");

      ReactGA.event({
        category: "Payment",
        action: "Successful Payment",
        label: cardHolderName, // optional
        value: +totalPrice, // optional, must be a number
        // nonInteraction: true, // optional, true/false
        // transport: "xhr", // optional, beacon/xhr/image
      });

      if (setRefreshPage && setDashboardMenu) {
        setRefreshPage(true);
        setInvoiceInfo(null);
        setDashboardMenu("Domain");
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={loadNextHandler}>
      <div className={classes.form}>
        {/* <CardElement /> */}
        <div>
          {show && (
            <Fragment>
              <label>Card holder name</label>
              <TextField
                required
                fullWidth
                placeholder="Card Holder Name"
                id="cardHolderName"
                size="small"
                sx={{
                  marginBottom: "0.75rem",
                }}
                onBlur={(event) => setCardHolderName(event.target.value)}
              />
            </Fragment>
          )}
          <PaymentElement
            onReady={() => setShow(true)}
            // options={{
            //   fields: {
            //     billingDetails: {
            //       name: "auto",
            //       email: "auto",
            //       address: {
            //         country: "never",
            //         // postalCode: "never",
            //       },
            //     },
            //   },
            // }}
          />
        </div>
        {/* <div>
      <p>Credit/Debit Card Number</p>
      <TextField
        required
        fullWidth
        type="text"
        placeholder="Enter 14 Digit Card Number"
        id="cardNo"
        size="small"
        onBlur={setData}
      />
      <div className={classes.together}>
        <div style={{ marginRight: "2rem" }}>
          <p>CVC</p>
          <TextField
            required
            placeholder="CVC"
            id="cvc"
            size="small"
            onBlur={setData}
          />
        </div>
        <div>
          <p>Expiry Date</p>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              // label="Date desktop"
              // value={props.authData.expDate}
              value={showDate}
              inputFormat="MM/YY"
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  id="expDate"
                  required
                  size="small"
                  {...params}
                  // onBlur={setData}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div> */}
        <div className={classes["static-details"]}>
          <p>All Details</p>
          <ul>
            <li>
              Domain Name:{" "}
              {authData.newDomain || authData.domain || selectedDomain}
            </li>
            <li>Number of Emails: {authData.emailNo}</li>
            <li>
              Email Package:{" "}
              {authData.emailPackage === enterpriseId
                ? "Enterprise Email"
                : "Business Email"}
            </li>
            {/* <li>Name: {authData.name}</li> */}
            {/* <li>Email: {authData.email}</li> */}
            {/* <li>Phone Number: {authData.number}</li> */}
            {/* <li>Address: {authData.address}</li> */}
            {/* <li>Company Name: {authData.company}</li> */}
          </ul>
        </div>
      </div>

      <hr style={{ marginTop: "3rem" }} />
      <div className={classes.total}>
        <p>Total price</p>
        <p>$ {totalPrice}</p>
      </div>
      <div className={classes["submit-buttons"]}>
        <button
          // onClick={loadNextHandler}
          type="submit"
          disabled={!stripe || !elements || loading ? true : false}
          className={classes["color-button"]}
        >
          {loading ? "Please Wait..." : "Pay Now"}
        </button>
        {/* <button
          //   onClick={loadPreviousHandler}
          disabled
          type="button"
          className={classes["color-inverse-button"]}
        >
          Back
        </button> */}
      </div>
    </form>
  );
};

export default PaymentForm;
