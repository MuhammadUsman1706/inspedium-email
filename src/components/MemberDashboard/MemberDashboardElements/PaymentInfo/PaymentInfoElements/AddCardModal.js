import React, { Fragment, useState } from "react";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Box, Modal, TextField, Typography } from "@mui/material";

import classes from "./AddCardModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "DM Sans !important",
  maxWidth: "90%",
};

const AddCardModal = ({
  open,
  setOpen,
  setAddCardInformation,
  setPaymentInfo,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const addCardHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !cardHolderName) {
      setLoading(false);
      return;
    }

    // const result = await stripe.confirmSetup({
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: cardHolderName,
          },
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      setOpen(false);
      setAddCardInformation(null);
      setPaymentInfo(null);
      toast.success("Card added successfully!");
    }
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{
            margin: 0,
            background: "linear-gradient(317.25deg, #00505D 0%, #52BD94 100%)",
            padding: "0.5rem 1rem",
            color: "white",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Add Card
        </Typography>
        <div className={classes["add-card-modal"]}>
          <form
            onSubmit={addCardHandler}
            className={classes["add-card-modal-form"]}
          >
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
            <PaymentElement onReady={() => setShow(true)} />
            <button disabled={loading} type="submit" className="color-button">
              {loading ? "Please Wait" : "Submit"}
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default AddCardModal;
