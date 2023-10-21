import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";

import classes from "./Invoices.module.css";

let requestOptions;

const Invoices = ({ invoiceInfo, setInvoiceInfo }) => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!invoiceInfo) {
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
      fetch("https://api.inspedium.email/invoice-summary", requestOptions).then(
        (response) =>
          response
            .json()
            .then((responseData) =>
              setInvoiceInfo((prevState) => ({ ...prevState, ...responseData }))
            )
      );
      fetch("https://api.inspedium.email/invoice-list", requestOptions).then(
        (response) =>
          response.json().then((responseData) =>
            setInvoiceInfo((prevState) => ({
              ...prevState,
              list: responseData.data,
            }))
          )
      );
    }
  }, []);

  const retryInvoicePaymentHandler = (id) => {
    const formData = new FormData();
    formData.append("invoiceID", id);

    requestOptions.method = "POST";
    requestOptions.body = formData;

    confirmAlert({
      title: "Confirm Payment",
      message: "Are you sure you want to retry your payment?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetch(
              "https://api.inspedium.email/invoice-pay",
              requestOptions
            );
            const responseData = await response.json();
            if (response.ok) {
              setInvoiceInfo(null);
              toast.success("Payment Successful!");
            } else {
              toast.error(responseData.detail.split(":").pop());
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
    <div className={classes.invoices}>
      <div className={classes.summary}>
        <h2>{invoiceInfo?.next_billing_date ? "Summary" : "Loading..."}</h2>
        <hr />
        <div className={classes["summary-details"]}>
          <p>
            <span>Next billing date: </span> &nbsp;
            {invoiceInfo?.next_billing_date
              ? new Date(invoiceInfo?.next_billing_date * 1000).toDateString()
              : "-"}
          </p>
          {/* <p>
            <span>Total no. of mailbox: </span> &nbsp;02
          </p>
          <p>
            <span>Total no. of domains: </span> &nbsp;02
          </p> */}
          <p>
            <span>Total amount: </span> &nbsp;
            <div
              style={{
                textTransform: "uppercase",
                display: "inline",
              }}
            >
              {invoiceInfo?.total ? invoiceInfo?.total : "-"}&nbsp;
              {invoiceInfo?.currency}
            </div>
          </p>
        </div>
      </div>
      <div className={classes["domain-table"]}>
        <table>
          <thead>
            <tr>
              <th>Inv. Number</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {invoiceInfo?.list
              ? invoiceInfo.list.map((invoice) => (
                  <tr key={invoice?.id}>
                    <td>
                      <span className={classes["table-text"]}>
                        {invoice?.number}
                      </span>
                    </td>
                    <td>
                      <span className={classes["table-text"]}>
                        {new Date(invoice?.created * 1000).toDateString()}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          textTransform: "uppercase",
                        }}
                        className={classes["table-text"]}
                      >
                        {invoice?.amount_due / 100} {invoice?.currency}
                      </span>
                    </td>
                    <td
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      <span className={classes["table-text"]}>
                        {invoice?.status === "open" ? "Unpaid" : invoice.status}
                      </span>
                    </td>
                    {invoice.status !== "paid" ? (
                      <td
                        onClick={() => retryInvoicePaymentHandler(invoice?.id)}
                        className={classes.icons}
                      >
                        <Tooltip title="Retry Payment">
                          <ReplayIcon />
                        </Tooltip>
                      </td>
                    ) : (
                      <td> </td>
                    )}
                    <td>
                      <a
                        target="_blank"
                        href={invoice?.invoice_pdf}
                        style={{
                          color: "#00505D",
                          cursor: "pointer",
                        }}
                      >
                        <Tooltip title="Download PDF">
                          <FileCopyIcon />
                        </Tooltip>
                      </a>
                    </td>
                  </tr>
                ))
              : [...Array(3)].map(() => (
                  <tr>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
