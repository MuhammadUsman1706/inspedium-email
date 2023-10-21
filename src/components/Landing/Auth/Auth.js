import React, { Fragment, useEffect, useRef, useState } from "react";
import PaymentForm from "./PaymentForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import isValidDomain from "is-valid-domain";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPackagesList } from "../../../firebase";
import StepWizard from "react-step-wizard";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import BackupIcon from "@mui/icons-material/Backup";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShieldIcon from "@mui/icons-material/Shield";
import RuleIcon from "@mui/icons-material/Rule";

import classes from "./Auth.module.css";
import "react-phone-number-input/style.css";
import "animate.css";

let breakValue;

const Auth = () => {
  const params = useParams();
  const businessId = localStorage.getItem("businessId");
  const [stripePromise, setStripePromise] = useState(undefined);
  const [options, setOptions] = useState(undefined);
  const [packageInformation, setPackageInformation] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountVoucher, setDiscountVoucher] = useState(null);
  const [authData, setAuthData] = useState({
    domain: "",
    emailNo: "1",
    emailPackage: businessId,
    planDuration: "month",
    name: "",
    email: "",
    number: "",
    address: "",
    company: "",
    password: "",
  });

  let custom = {
    enterRight: "animate__animated animate__backInRight",
    enterLeft: "animate__animated animate__backInLeft",
    exitRight: "animate__animated animate__fadeOut",
    exitLeft: "animate__animated animate__fadeOut",
    intro: "animate__animated animate__backInRight",
  };

  useEffect(() => {
    if (params.emailPackage) {
      // console.log(params);
      setAuthData((prevState) => ({
        ...prevState,
        emailPackage: params.emailPackage,
        planDuration: params.planDuration,
      }));
    }

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
        nav={<StepNavbar domain={authData.domain} />}
      >
        <StepOne
          authData={authData}
          setAuthData={setAuthData}
          discountVoucher={discountVoucher}
          setDiscountVoucher={setDiscountVoucher}
          totalPrice={totalPrice}
        />
        <StepTwo
          authData={authData}
          setAuthData={setAuthData}
          setOptions={setOptions}
          setStripePromise={setStripePromise}
          totalPrice={totalPrice}
          packageInformation={packageInformation}
        />
        <StepThree
          authData={authData}
          stripePromise={stripePromise}
          totalPrice={totalPrice}
          options={options}
        />
      </StepWizard>
    </section>
  );
};

const StepNavbar = (props) => {
  const stepTwoCheckHandler = () => {
    if (props.currentStep !== 3) {
      if (isValidDomain(props.domain)) {
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
      <Step onClick={stepTwoCheckHandler}>
        <StepLabel>Account Details</StepLabel>
      </Step>
      <Step>
        <StepLabel>Checkout Details</StepLabel>
      </Step>
    </Stepper>
  );
};

const PurchaseEmail = (props) => {
  const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId");
  const enterpriseId = localStorage.getItem("enterpriseId");
  const promoRef = useRef();

  const loadNextHandler = (event) => {
    event.preventDefault();
    if (isValidDomain(props.authData.domain)) props.nextStep();
    else
      toast.error(
        "Please enter a correct domain! The correct format is 'example.com'"
      );
  };

  const loadPreviousHandler = () => {
    navigate("/");
  };

  const setData = (event) => {
    props.setAuthData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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
    // Coupon OK
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
    <form onSubmit={loadNextHandler} autoComplete="off">
      <div className={classes.form}>
        <div>
          <p>Domain</p>
          <TextField
            // label="Enter Domain"
            required
            fullWidth
            placeholder="example.com"
            id="domain"
            name="domain"
            size="small"
            onChange={setData}
          />
          <p>Number of Emails</p>
          <TextField
            // label=""
            required
            fullWidth
            id="emailNo"
            name="emailNo"
            size="small"
            defaultValue={1}
            // value={props.authData.emailNo}
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            type="number"
            onChange={setData}
            onKeyPress={(event) => {
              event.preventDefault();
            }}
          />
          <p>Email Package</p>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Select Package</InputLabel> */}
            <Select
              required
              labelId="demo-simple-select-label"
              id="emailPackage"
              name="emailPackage"
              defaultValue={businessId}
              value={props.authData.emailPackage}
              onChange={setData}
              // value={age}
              // label="Select Package"
              // onChange={handleChange}
            >
              <MenuItem value={businessId}>Business Email</MenuItem>
              <MenuItem value={enterpriseId}>Enterprise Email</MenuItem>
            </Select>
          </FormControl>
          <p>Plan Duration</p>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Select Package</InputLabel> */}
            <Select
              required
              labelId="demo-simple-select-label"
              id="planDuration"
              name="planDuration"
              defaultValue="month"
              value={props.authData.planDuration}
              onChange={setData}
              // value={age}
              // label="Select Package"
              // onChange={handleChange}
            >
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
            </Select>
          </FormControl>
          <p>Promo Code</p>
          {/* <TextField
            // label="Enter Domain"
            // required
            fullWidth
            placeholder="weekDemoSarim007"
            id="promoCode"
            name="promoCode"
            size="small"
            onBlur={setDiscountVoucherHandler}
          /> */}
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
        <p>${props.totalPrice}</p>
      </div>
      <div className={classes["submit-buttons"]}>
        <button type="submit" className={classes["color-button"]}>
          Continue
        </button>
        <button
          onClick={loadPreviousHandler}
          type="button"
          className={classes["color-inverse-button"]}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const PersonalDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const enterpriseId = localStorage.getItem("enterpriseId");
  const [canSeePassword, setCanSeePassword] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const loadNextHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Dummy
    const token = await executeRecaptcha();
    // Dummy

    const authDataKeys = Object.keys(props.authData);
    const authDataValues = Object.values(props.authData);
    const filterCheck = authDataValues.findIndex((value) => !value);
    const numberCheck = isPossiblePhoneNumber(props.authData.number);

    if (!numberCheck) {
      toast.error("Please enter a valid phone number!");
      setLoading(false);
      return;
    }

    // if (!props.authData.domain.includes("."))
    // if (!isValidDomain(props.authData.domain)) {
    //   toast.error(
    //     "Please enter a correct domain! The correct format is 'example.com'"
    //   );
    //   setLoading(false);
    //   return;
    // }

    if (typeof authDataKeys[filterCheck] === "undefined") {
      // setError({ show: false, value: "" });
      // Create Customer
      // console.log(props.authData);
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      requestOptions.body = JSON.stringify({
        email: props.authData.email,
        name: props.authData.name,
        phone: props.authData.number,
        password: props.authData.password,
        domain: props.authData.domain,
        plan_id: props.authData.emailPackage,
        no_mailbox: props.authData.emailNo,
        company: props.authData.company,
      });

      try {
        const createCustomerResponse = await fetch(
          "https://api.inspedium.email/create-customer",
          requestOptions
        );

        const createCustomerResponseData = await createCustomerResponse.json();

        if (createCustomerResponseData?.error) {
          toast.error(createCustomerResponseData.error);
          setLoading(false);
          return;
        }

        // Generate Client Secret

        myHeaders.append("uuid", createCustomerResponseData.user_id);
        myHeaders.append("customer", createCustomerResponseData.customer.id);

        requestOptions.headers = myHeaders;

        requestOptions.body = JSON.stringify({
          priceId:
            props.packageInformation[props.authData.emailPackage].price[
              props.authData.planDuration
            ].id,
          no_mailbox: props.authData.emailNo,
          plan_id: props.authData.emailPackage,
          domain: props.authData.domain,
          existing_user: false,
          oldCard: false,
          // customer: customerId,
          // uuid: createCustomerResponseData.user_id,
        });

        // console.log(requestOptions.body);

        const createSubscriptionResponse = await fetch(
          `https://api.inspedium.email/create-subscription${
            props.authData?.promo ? `?promoid=${props.authData?.promo}` : ""
          }`,
          // `https://api.inspedium.email/create-subscription?promoid=${
          //   props.authData?.promo ? props.authData.promo : ""
          // }`,
          requestOptions
        );

        const { subscriptionId, clientSecret } =
          await createSubscriptionResponse.json();

        // console.log("Client Secret: ", clientSecret);
        props.setOptions({ clientSecret });

        const configResponse = await fetch(
          "https://api.inspedium.email/config",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(configResponse);

        const { publishableKey } = await configResponse.json();

        // console.log(publishableKey);
        props.setStripePromise(loadStripe(publishableKey));

        props.nextStep();
      } catch (err) {
        toast.error("Some error occurred, please try later.");
      }
    } else {
      // setError({ show: true, value: authDataKeys[filterCheck] });
      console.log("Check Field: ", authDataKeys[filterCheck]);
      toast.error("Please fill all fields correctly!");
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const loadPreviousHandler = () => {
    props.previousStep();
  };

  const setData = (event, number = null) => {
    if (number) {
      props.setAuthData((prevState) => ({
        ...prevState,
        number: event,
      }));
      return;
    }

    props.setAuthData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    // console.log(event.target.id, event.target.value);
  };
  return (
    <form onSubmit={loadNextHandler} autoComplete="off">
      <div className={classes.form}>
        <div>
          <p>Name</p>
          <TextField
            // label="Enter Domain" required
            required
            fullWidth
            placeholder="Enter Name"
            id="name"
            size="small"
            onChange={setData}
          />
          <p>Email</p>
          <TextField
            required
            fullWidth
            type="email"
            placeholder="Enter Email Address"
            id="email"
            size="small"
            onChange={setData}
          />
          <p>Phone Number</p>
          <PhoneInput
            placeholder="Enter phone number"
            value={props.authData.number}
            defaultCountry="PK"
            countryCallingCodeEditable={false}
            international
            withCountryCallingCode={true}
            onChange={(data) => setData(data, "number")}
          />
          {/* <TextField
            required
            fullWidth
            placeholder="Enter Phone Number"
            id="number"
            size="small"
            onChange={setData}
          /> */}
          <p>Address</p>
          <TextField
            required
            fullWidth
            placeholder="Enter Address"
            id="address"
            size="small"
            onChange={setData}
          />
          <p>Company Name</p>
          <TextField
            required
            fullWidth
            placeholder="Enter Company Name"
            id="company"
            size="small"
            onChange={setData}
          />
          <p>Password</p>
          <div className={classes["button-icon"]}>
            <TextField
              required
              fullWidth
              placeholder="Enter Password"
              type={canSeePassword ? "text" : "password"}
              id="password"
              size="small"
              onChange={setData}
            />
            <span
              onClick={() => {
                setCanSeePassword((prevState) => !prevState);
              }}
            >
              <VisibilityIcon />
            </span>
          </div>
        </div>
        <div className={classes["static-details"]}>
          <p>Purchase Details</p>
          <ul>
            <li>Domain Name: {props.authData.domain}</li>
            <li>Number of Emails: {props.authData.emailNo}</li>
            <li>
              Email Package:{" "}
              {props.authData.emailPackage === enterpriseId
                ? "Enterprise Email"
                : "Business Email"}
            </li>
          </ul>
        </div>
      </div>
      <hr style={{ marginTop: "3rem" }} />
      <div className={classes.total}>
        <p>Total price</p>
        <p>${props.totalPrice}</p>
      </div>
      <div className={classes["submit-buttons"]}>
        <button
          disabled={loading}
          type="submit"
          className={`${classes["color-button"]}`}
        >
          {loading ? "Please Wait..." : "Continue"}
        </button>
        <button
          disabled={loading}
          onClick={loadPreviousHandler}
          type="button"
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
              authData={props.authData}
              clientSecret={props.options.clientSecret}
              totalPrice={props.totalPrice}
            />
          </Elements>
        </Fragment>
      )}
    </Fragment>
  );
};

// export const StepNav = <StepNavbar  />;
export const StepOne = PurchaseEmail;
export const StepTwo = PersonalDetails;
export const StepThree = CheckoutDetails;
export default Auth;
