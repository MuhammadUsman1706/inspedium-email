import React, { Fragment, useEffect, useRef, useState } from "react";
import PaymentInfo from "../../../PaymentInfo/PaymentInfo";
import PaymentForm from "../../../../../Landing/Auth/PaymentForm";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import {
  getDomainInformation,
  getPackagesList,
} from "../../../../../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import StepWizard from "react-step-wizard";
import { toast } from "react-toastify";
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import BackupIcon from "@mui/icons-material/Backup";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShieldIcon from "@mui/icons-material/Shield";
import RuleIcon from "@mui/icons-material/Rule";

import classes from "./UpgradeEmailStepper.module.css";
import "animate.css";
import isValidDomain from "is-valid-domain";

let breakValue;

const UpgradeEmailStepper = ({
  setMode,
  selectedDomainStats,
  setSelectedDomainStats,
  selectedDomain,
  setSelectedDomain,
  domainData,
  paymentInfo,
  setPaymentInfo,
  setDashboardMenu,
  setRefreshPage,
  setInvoiceInfo,
}) => {
  const businessId = localStorage.getItem("businessId");
  const [stripePromise, setStripePromise] = useState(undefined);
  const [options, setOptions] = useState(undefined);
  const [newDomain, setNewDomain] = useState(true);
  const [isUsingCurrentCard, setIsUsingCurrentCard] = useState(true);
  // const [isUsingCurrentCard, setIsUsingCurrentCard] = useState(
  //   paymentInfo?.id ? true : false
  // );
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountVoucher, setDiscountVoucher] = useState(null);

  const [authData, setAuthData] = useState({
    newDomain: "",
    existingDomain: "",
    emailNo: "1",
    emailPackage: businessId,
    planDuration: "month",
  });

  const [packageInformation, setPackageInformation] = useState(undefined);

  let custom = {
    enterRight: "animate__animated animate__backInRight",
    enterLeft: "animate__animated animate__backInLeft",
    exitRight: "animate__animated animate__fadeOut",
    exitLeft: "animate__animated animate__fadeOut",
    intro: "animate__animated animate__backInRight",
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getPackagesList();
      setPackageInformation(response);
    };

    getData();
  }, []);

  useEffect(() => {
    if (packageInformation) {
      let value =
        packageInformation[authData.emailPackage].price[authData.planDuration]
          .price * +authData.emailNo;

      // New Addition
      if (discountVoucher) {
        breakValue = value;
        if (discountVoucher?.minimum <= breakValue) {
          if (discountVoucher.type === "flat") {
            value = value - discountVoucher.figure;
          } else {
            value = value * ((100 - discountVoucher.figure) / 100);
          }
        } else {
          toast.error(
            "Less than minimum amount reached for promo code reached. Promo Code removed."
          );
          setDiscountVoucher(null);
          authData.promo = null;
        }
      }
      // New Addition

      setTotalPrice(value);
    }
  }, [
    authData.emailPackage,
    authData.planDuration,
    authData.emailNo,
    packageInformation,
    discountVoucher,
  ]);

  return (
    <section className={classes.auth}>
      <StepWizard
        transitions={custom}
        nav={
          <StepNavbar isNewDomain={newDomain} newDomain={authData.newDomain} />
        }
      >
        <StepOne
          setMode={setMode}
          newDomain={newDomain}
          setNewDomain={setNewDomain}
          authData={authData}
          setAuthData={setAuthData}
          domainData={domainData}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedDomainStats={selectedDomainStats}
          setSelectedDomainStats={setSelectedDomainStats}
          setIsUsingCurrentCard={setIsUsingCurrentCard}
          totalPrice={totalPrice}
          discountVoucher={discountVoucher}
          setDiscountVoucher={setDiscountVoucher}
        />
        <StepTwo
          newDomain={newDomain}
          authData={authData}
          setAuthData={setAuthData}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          isUsingCurrentCard={isUsingCurrentCard}
          setIsUsingCurrentCard={setIsUsingCurrentCard}
          selectedDomain={selectedDomain}
          selectedDomainStats={selectedDomainStats}
          setStripePromise={setStripePromise}
          setOptions={setOptions}
          packageInformation={packageInformation}
          setDashboardMenu={setDashboardMenu}
          setRefreshPage={setRefreshPage}
          totalPrice={totalPrice}
          setInvoiceInfo={setInvoiceInfo}
        />

        <StepThree
          newDomain={newDomain}
          authData={authData}
          setAuthData={setAuthData}
          stripePromise={stripePromise}
          options={options}
          totalPrice={totalPrice}
          setDashboardMenu={setDashboardMenu}
          setRefreshPage={setRefreshPage}
          setInvoiceInfo={setInvoiceInfo}
          selectedDomain={selectedDomain}
        />
      </StepWizard>
    </section>
  );
};

const StepNavbar = (props) => {
  const stepTwoCheckHandler = () => {
    if (props.currentStep !== 3) {
      if (!props.isNewDomain || isValidDomain(props.newDomain)) {
        props.goToStep(2);
      } else {
        toast.error(
          "Please enter a correct domain! The correct format is 'example.com'"
        );
      }
    }
  };

  return (
    <Stepper
      sx={{
        "& .MuiStepLabel-root .Mui-completed": {
          color: "#00505D", // circle color (COMPLETED)
        },
        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
          color: "#00505D", // Just text label (COMPLETED)
        },
        "& .MuiStepLabel-root .Mui-active": {
          color: "grey.500", // circle color (ACTIVE)
        },
        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
          color: "grey.500", // Just text label (ACTIVE)
        },
        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
          fill: "white", // circle's number (ACTIVE)
        },
        "& MuiSvgIcon-root": {
          fill: "white", // circle's number (ACTIVE)
        },
      }}
      activeStep={props.currentStep}
      alternativeLabel
    >
      <Step onClick={props.currentStep !== 3 && props.goToStep.bind(null, 1)}>
        <StepLabel>Purchase Email</StepLabel>
      </Step>
      {/* <Step onClick={props.currentStep !== 3 && props.goToStep.bind(null, 2)}> */}
      <Step onClick={stepTwoCheckHandler}>
        <StepLabel>Account Details</StepLabel>
      </Step>
      <Step>
        <StepLabel>Checkout Details</StepLabel>
      </Step>
    </Stepper>
  );
};

const UpgradeEmail = (props) => {
  const auth = useSelector((state) => state.auth);
  const businessId = localStorage.getItem("businessId");
  const enterpriseId = localStorage.getItem("enterpriseId");
  const userId = useSelector((state) => state.auth.id);
  const promoRef = useRef();

  const loadNextHandler = (event) => {
    event.preventDefault();
    if (!props.newDomain || isValidDomain(props.authData.newDomain)) {
      props.nextStep();
    } else {
      toast.error(
        "Please enter a correct domain! The correct format is 'example.com'"
      );
    }
  };

  const setData = (event) => {
    props.setAuthData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChange = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", userId);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const currentDomain = event.target.value;
    props.setSelectedDomain(currentDomain);

    const response = await fetch(
      `https://api.inspedium.email/domain-stats?domain=${currentDomain}`,
      requestOptions
    );

    const responseData = await response.json();

    props.setSelectedDomainStats(responseData);

    // KEEP IN MIND THE SEARCH
    // domainStatsCopy = responseData.email_list;
  };

  const setDiscountVoucherHandler = async (remove = false) => {
    const code = promoRef.current.value;
    if (!code.trim() || remove) {
      props.setDiscountVoucher(null);
      setData({ target: { name: "promo", value: null } });
      return;
    }
    const response = await fetch(
      `https://api.inspedium.email/checkpromocode?promo=${code}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      toast.error(responseData.detail);
      return;
    }
    if (responseData?.customer && responseData?.customer !== auth.stripe_id) {
      toast.error("This promo code is restricted to a specific user only.");
      return;
    }
    if (responseData.restrictions.first_time_transaction) {
      toast.error("Dear User, this coupon is for new users only.");
      return;
    }

    const minimum = +responseData?.restrictions.minimum_amount / 100;
    if (minimum <= props.totalPrice) {
      if (responseData.amount_off) {
        const figure = +responseData.amount_off / 100;
        props.setDiscountVoucher({
          type: "flat",
          figure,
          minimum,
        });
        setData({ target: { name: "promo", value: responseData.id } });
        toast.success(
          `Congratulations, a flat discount of $${figure} has been applied!`
        );
      } else if (responseData.percent_off) {
        props.setDiscountVoucher({
          type: "percent",
          figure: +responseData.percent_off,
          minimum,
        });
        setData({ target: { name: "promo", value: responseData.id } });
        toast.success(
          `Congratulations, a discount of ${responseData.percent_off}% has been applied!`
        );
      } else {
        toast.error("Invalid PromoCode!");
      }
    } else {
      toast.error(
        `Dear User, please reach the minimum amount of $${minimum} and try again!`
      );
    }
  };

  return (
    <form onSubmit={loadNextHandler}>
      <div className={classes.form}>
        <div>
          <div className={classes.radio}>
            <input
              type="radio"
              id="domain"
              name="domain"
              value="domain"
              defaultChecked
              onClick={() => props.setNewDomain(true)}
            />
            <label
              style={
                !props.newDomain ? { color: "grey" } : { color: "#00505D" }
              }
              for="domain"
            >
              New Domain
            </label>
          </div>
          <TextField
            required
            fullWidth
            placeholder="Enter Domain"
            id="newDomain"
            name="newDomain"
            size="small"
            value={props.authData.newDomain}
            onChange={setData}
            disabled={!props.newDomain}
          />
          <div className={classes.radio}>
            <input
              type="radio"
              id="existingDomain"
              name="domain"
              value="domain"
              onClick={() => {
                props.setNewDomain(false);
                props.setIsUsingCurrentCard(true); // RemCom
              }}
            />
            <label
              style={props.newDomain ? { color: "grey" } : { color: "#00505D" }}
              for="existingDomain"
            >
              Existing Domain
            </label>
          </div>
          <FormControl fullWidth>
            <Select
              required
              labelId="demo-simple-select-label"
              id="existingDomain"
              name="existingDomain"
              defaultValue=""
              value={props.selectedDomain}
              onChange={handleChange}
              disabled={props.newDomain}
            >
              {props?.domainData?.map((domain) => (
                <MenuItem value={domain.domain}>{domain.domain}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <p>Number of Emails</p>
          <TextField
            required
            fullWidth
            id="emailNo"
            name="emailNo"
            size="small"
            onKeyPress={(event) => {
              event.preventDefault();
            }}
            value={props.authData.emailNo}
            InputProps={{ inputProps: { min: 1 } }}
            type="number"
            onChange={setData}
          />
          <p>Email Package</p>
          <FormControl fullWidth>
            <Select
              required
              labelId="demo-simple-select-label"
              id="emailPackage"
              name="emailPackage"
              defaultValue={businessId}
              onChange={setData}
              disabled={!props.newDomain}
              value={
                props.newDomain
                  ? props.authData?.emailPackage
                  : props.selectedDomainStats?.product_name ===
                    "Business Emails"
                  ? businessId
                  : enterpriseId
              }
            >
              <MenuItem value={businessId}>Business Email</MenuItem>
              <MenuItem value={enterpriseId}>Enterprise Email</MenuItem>
            </Select>
          </FormControl>
          {props.newDomain && (
            <Fragment>
              <p>Package Duration</p>
              <FormControl fullWidth>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="planDuration"
                  name="planDuration"
                  value={props.authData.planDuration}
                  disabled={!props.newDomain}
                  onChange={setData}
                >
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Fragment>
          )}

          <p>Promo Code</p>
          <OutlinedInput
            fullWidth
            placeholder="FRONT2000"
            id="promoCode"
            name="promoCode"
            inputRef={promoRef}
            // onBlur={setDiscountVoucherHandler}
            // size="small"
            // type="text"
            endAdornment={
              <InputAdornment position="end">
                {props.discountVoucher ? (
                  <IconButton
                    onClick={() => setDiscountVoucherHandler(true)}
                    edge="end"
                    sx={{ fontSize: "15px" }}
                  >
                    REMOVE
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => setDiscountVoucherHandler()}
                    edge="end"
                    sx={{ fontSize: "15px" }}
                  >
                    APPLY
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </div>
        <div className={classes["static-details"]}>
          <p>Package Details</p>
          <ul>
            <li>
              <SdStorageIcon /> 10GB Space
            </li>
            <li>
              <BackupIcon /> Backup
            </li>
            <li>
              <FolderSharedIcon /> Shared Folders
            </li>
            <li>
              <AutoStoriesIcon /> Address Book
            </li>
            <li>
              <CalendarMonthIcon /> Calendar
            </li>
            <li>
              <ListAltIcon /> Tasks
            </li>
            <li>
              <ShieldIcon /> Advanced Spam & Virus Filtering
            </li>
            <li>
              <RuleIcon /> Message Delivery Rules
            </li>
          </ul>
        </div>
      </div>
      <hr className={classes.hr} />
      <div className={classes.total}>
        <p>Total price</p>
        <p>$ {props.totalPrice}</p>
      </div>
      <div className={classes["submit-buttons"]}>
        <button type="submit" className={classes["color-button"]}>
          Continue
        </button>
        <button
          onClick={() => props.setMode("mainPage")}
          type="button"
          className={classes["color-inverse-button"]}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const ReviewInfo = (props) => {
  // const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId");
  const auth = useSelector((state) => state.auth);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNextHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", auth.id);
    myHeaders.append("customer", auth.stripe_id);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    if (props.isUsingCurrentCard && !props.paymentInfo[selectedCardIndex]?.id) {
      toast.error("Invalid current card!");
      setLoading(false);
      return;
    }

    try {
      if (!props.newDomain) {
        const responseData = await getDomainInformation(
          auth.id,
          props.selectedDomain.replace(".", "-")
        );

        const keys = Object.keys(responseData);
        const domainInformation = responseData[keys[0]];
        requestOptions.body = JSON.stringify({
          priceId: domainInformation.price_id,
          no_mailbox:
            parseInt(domainInformation.no_mailbox) +
            parseInt(props.authData.emailNo),
          domain: domainInformation.domain,
          subscriptionId: domainInformation.subscriptionId,
          oldCard: props.isUsingCurrentCard ? true : false,
          pmID: props?.paymentInfo[selectedCardIndex]?.id,
          // oldCard: false,
        });

        const response = await fetch(
          "https://api.inspedium.email/upgrade-subscription",
          requestOptions
        );

        const responseData2 = await response.json();

        if (!props.isUsingCurrentCard) {
          const { clientSecret, publishableKey } = responseData2;
          props.setOptions({ clientSecret });
          props.setStripePromise(loadStripe(publishableKey));
          props.nextStep();
          return;
        } else {
          toast.success("Upgrade Successful!");
        }
      } else if (props.newDomain) {
        if (props.authData.emailNo) {
          requestOptions.body = JSON.stringify({
            priceId:
              props.packageInformation[props.authData.emailPackage].price[
                props.authData.planDuration
              ].id,
            no_mailbox: props.authData.emailNo,
            plan_id: props.authData.emailPackage,
            domain: props.authData.newDomain,
            existing_user: true,
            oldCard: props.isUsingCurrentCard ? true : false,
            pmID: props?.paymentInfo[selectedCardIndex]?.id,
          });

          const createSubscriptionResponse = await fetch(
            `https://api.inspedium.email/create-subscription${
              props.authData?.promo ? `?promoid=${props.authData?.promo}` : ""
            }`,
            requestOptions
          );

          if (!createSubscriptionResponse.ok) {
            toast.error("Some error has occurred, please try later!");
            setLoading(false);
            return;
          }

          if (!props.isUsingCurrentCard) {
            const createSubscriptionResponseData =
              await createSubscriptionResponse.json();

            const { clientSecret, publishableKey } =
              createSubscriptionResponseData;
            props.setOptions({ clientSecret });
            props.setStripePromise(loadStripe(publishableKey));
            props.nextStep();
            return;
          } else {
            toast.success("New Domain Successfully Added!");
          }
        } else {
          toast.error("Number of Emails can't be less than one!");
          setLoading(false);
          return;
        }
      }
      props.setRefreshPage(true);
      props.setInvoiceInfo(null);
      props.setDashboardMenu("Domain");
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred, please try later!");
    }
    setLoading(false);
  };
  const loadPreviousHandler = () => {
    props.previousStep();
  };

  return (
    <form onSubmit={loadNextHandler}>
      <div className={classes.form}>
        <div>
          <div className={classes.radio}>
            <input
              type="radio"
              id="currentCard"
              name="currentCard"
              checked={props.isUsingCurrentCard}
              onClick={() => {
                props.setIsUsingCurrentCard(true);
              }}
            />
            <label
              style={
                props.isUsingCurrentCard
                  ? { color: "#00505D" }
                  : { color: "grey" }
              }
              for="currentCard"
            >
              Use Current Card Information
            </label>
          </div>
          <PaymentInfo
            paymentInfo={props.paymentInfo}
            setPaymentInfo={props.setPaymentInfo}
            selectedCardIndex={selectedCardIndex}
            setSelectedCardIndex={setSelectedCardIndex}
            disable={!props.isUsingCurrentCard}
          />
          <br />
          {/* RemCom */}
          {(props.newDomain || !props?.paymentInfo?.length) && (
            <div className={classes.radio}>
              <input
                type="radio"
                id="newCard"
                name="currentCard"
                checked={!props.isUsingCurrentCard}
                onClick={() => props.setIsUsingCurrentCard(false)}
              />
              <label
                style={
                  props.isUsingCurrentCard
                    ? { color: "grey" }
                    : { color: "#00505D" }
                }
                for="newCard"
              >
                Add New Card Information
              </label>
            </div>
          )}
        </div>
        <div className={classes["static-details"]}>
          <p>Email Details</p>
          <ul>
            <li>
              Domain Name: &nbsp;
              {props.newDomain
                ? props.authData.newDomain
                : props.selectedDomain}
            </li>
            <li>
              Number of Emails:{" "}
              {props.newDomain
                ? props.authData?.emailNo
                : props.selectedDomainStats?.total_mailBox}
            </li>
            <li>
              Email Package:{" "}
              {props.newDomain &&
                (props.authData?.emailPackage === businessId
                  ? "Business Email"
                  : "Enterprise Email")}
              {!props.newDomain &&
                `${props.selectedDomainStats?.product_name} email`}
            </li>
          </ul>
        </div>
      </div>
      <hr style={{ marginTop: "3rem" }} />
      <div className={classes.total}>
        <p>Total price</p>
        <p>$ {props.totalPrice}</p>
      </div>
      <div className={classes["submit-buttons"]}>
        <button
          // onClick={loadNextHandler}
          type="submit"
          disabled={loading}
          className={classes["color-button"]}
        >
          {loading
            ? "Please Wait..."
            : props.isUsingCurrentCard
            ? "Pay Now"
            : "Continue"}
        </button>
        <button
          onClick={loadPreviousHandler}
          type="button"
          disabled={loading}
          className={classes["color-inverse-button"]}
        >
          Back
        </button>
      </div>
    </form>
  );
};

const CheckoutDetails = (props) => {
  return (
    <Fragment>
      {props.stripePromise && props.options && (
        <Fragment>
          <Elements stripe={props.stripePromise} options={props.options}>
            <PaymentForm
              selectedDomain={props.selectedDomain}
              authData={props.authData}
              clientSecret={props.options.clientSecret}
              totalPrice={props.totalPrice}
              setDashboardMenu={props.setDashboardMenu}
              setRefreshPage={props.setRefreshPage}
              setInvoiceInfo={props.setInvoiceInfo}
            />
          </Elements>
        </Fragment>
      )}
    </Fragment>
  );
};

// export const StepNav = <StepNavbar />;
export const StepOne = UpgradeEmail;
export const StepTwo = ReviewInfo;
export const StepThree = CheckoutDetails;
export default UpgradeEmailStepper;
