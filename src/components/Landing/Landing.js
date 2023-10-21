import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPackagesList } from "../../firebase";
import Faq from "react-faq-component";
import Carousel from "react-material-ui-carousel";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import StarIcon from "@mui/icons-material/Star";
import initialDisplay from "../../assets/images/initialDisplay.png";
import rtl_pat from "../../assets/images/rtl_pat.png";
import ltr_pat from "../../assets/images/ltr_pat.png";

import classes from "./Landing.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Landing = () => {
  const activeRef = useRef();
  const navigate = useNavigate();

  const [switchPrice, setSwitchPrice] = useState(false);
  const [packagesList, setPackagesList] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const businessEmailFeatures = [
    "Out-of-Office Autoresponder",
    "Backup",
    "Domain Alias",
    "Shared Folders",
    "Address Book",
    "Calendar",
    "Tasks",
    "Notes",
    "Control Panel",
    "Personal Support",
    "Search Folders",
    "Message Delivery Rules",
    "Whitelist & Backlist",
    "Forwarders",
    "Advanced Spam & Virus Filtering",
    "Two-factor Authentications",
    "E-MAIL, CALENDAR AND CONTACT SYNCHRONIZATION",
    "IMAP Account Consolidation",
    "Document Editing",
    "Advance Groupware",
    "Account Summary",
    "Shared Calendar",
  ];

  const faqData = {
    // title: "FAQ (How it works)",
    rows: [
      {
        title: "Do you offer a free trial?",
        content:
          "Absolutely! We provide trial accounts, but only with adequate verification. Due to the character of our service and to guard both ourselves and our network against possible outgoing spam, confirmation is a must. Do feel free to write to us asking for a trial account.",
      },
      {
        title: "Which Payment Methods do you Offer?",
        content:
          "With us, you can pay for your Basic or Enhanced Mailbox accounts using Visa, Mastercard, Discover, and Diners Credit Cards! All it takes is a few clicks: select an account type of your choice and enter in the necessary details. That's all there is to it - easy as pie!",
      },
      {
        title: "Will I be tied to a Contract?",
        content:
          "No. Inspedium.Email is a month-to-month service and thus can be cancelled at any time. Although for your convenience, you may also choose to pre-pay for specific periods. Please note that all prepayments are nonrefundable in case of cancellation requests.",
      },
      {
        title: "When is my Subscription Cancelled?",
        content:
          "If you cancel your subscription through the panel or if payments fail three times in a row, we'll provide ample warning before removing your account. You will be notified at least three days beforehand to be fully informed and prepared.",
      },
      {
        title: "What is a Deleted Account?",
        content:
          "When you opt out of your subscription, we will immediately terminate your account and all its associated content. Any emails or files stored on the account may be permanently lost, so it is essential to transfer these documents elsewhere beforehand if they are valuable. Therefore, please ensure you have safely transferred anything important (such as mail, contacts, calendar information and files) before cancelling your subscription with us.",
      },
    ],
  };

  const resetActiveClass = () => {
    activeRef.current.classList.remove(classes.active);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getPackagesList();
      const tempIds = Object.keys(response);
      setProductIds(tempIds);
      localStorage.setItem("businessId", tempIds[0]);
      localStorage.setItem("enterpriseId", tempIds[1]);
      setPackagesList(response);
    };
    getData();
  }, []);

  return (
    <div className={classes.landing}>
      <section className={classes.text}>
        <h1>
          The Reliable and Secure Email Hosting Solution for Your Business
        </h1>
        <p>
          Inspedium.Email provides reliable and secure email hosting services
          for businesses of all sizes. Our fully-managed cloud email hosting
          service offers advanced features to help you securely store, organise,
          and retrieve your emails. We ensure that your data is always safe,
          secure and accessible so you can focus on growing your business
          without worrying about the availability of your email accounts.
        </p>
        <br />
        <img loading="lazy" src={initialDisplay} alt="Inspedium Email" />
      </section>

      <section>
        <h1 className={classes["main-heading"]}>
          Reliable Business Email Hosting Service
        </h1>
        <div className={classes["hover-cards"]}>
          <div onMouseOver={resetActiveClass} className={classes["hover-card"]}>
            <h2>Realtime Backups</h2>
            <p className={classes["para-text"]}>
              Our sophisticated real-time multi-layered backup system ensures
              that your data remains secure for up to a month. Furthermore, we
              archive each message in all folders so that you never lose a
              valuable email, even if you accidentally delete it!
            </p>
          </div>

          <div
            onMouseOver={resetActiveClass}
            ref={activeRef}
            className={`${classes["hover-card"]} ${classes.active}`}
          >
            <h2>Emails, Address Book & Calendar</h2>
            <p className={classes["para-text"]}>
              Streamline your email, calendar, contacts, and tasks to be
              synchronised across all devices with our service. You can enjoy
              fast and easy data synchronisation on any device with just a few
              clicks!
            </p>
          </div>

          <div onMouseOver={resetActiveClass} className={classes["hover-card"]}>
            <h2>Powerful Webmail</h2>
            <p className={classes["para-text"]}>
              Gain access to your mailbox from any device, wherever you are with
              our quick and modern Webmail. We've also got the added benefits of
              shared calendars, address books, notes and tasks included in this
              service!
            </p>
          </div>
        </div>
      </section>

      <div className={classes["paw-pattern-right"]}>
        <LazyLoadImage loading="lazy" src={rtl_pat} />
      </div>

      <article className={classes["pricing"]}>
        <h1 className={classes["main-heading"]}>Our Pricing</h1>
        <p className={classes["para-text"]}>
          Establish an authoritative presence with our <strong>Basic</strong>{" "}
          email address plus your own domain name—show potential customers that
          you are serious about business! You can even establish multiple alias
          at no extra cost. <br />
          For the most streamlined coordination among members of your team,
          upgrade to the <strong>Enhanced</strong> mailbox and gain access to
          all the essential tools necessary for everyday operations which sync
          across devices seamlessly.
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
        {packagesList && (
          <div className={classes["pricing-cards"]}>
            <div className={classes["pricing-card"]}>
              <h3>Business Email</h3>
              <h1 style={{ display: "inline" }}>
                $
                {switchPrice
                  ? packagesList[productIds[0]].price.year.price
                  : packagesList[productIds[0]].price.month.price}
              </h1>
              <span> per {switchPrice ? "year" : "month"}</span>
              <p style={{ color: "#00505D", fontSize: "0.9rem" }}>
                per mailbox contain 10GB
              </p>

              <ul className={classes["pricing-features"]}>
                {businessEmailFeatures.map((feature, index) =>
                  index > 15 ? (
                    <li style={{ color: "grey" }}>
                      <TaskAltIcon />
                      <span>{feature}</span>
                    </li>
                  ) : (
                    <li>
                      <TaskAltIcon color="success" />
                      <span>{feature}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                to={
                  switchPrice
                    ? `buynow/${productIds[0]}/year/${
                        packagesList[productIds[0]].price.year.price
                      }`
                    : `buynow/${productIds[0]}/month/${
                        packagesList[productIds[0]].price.month.price
                      }`
                }
              >
                <button
                  style={{ width: "45%", marginTop: "1rem" }}
                  className={classes["color-button"]}
                >
                  Select
                </button>
              </Link>
            </div>
            <div className={classes["pricing-card"]}>
              <h3>Enterprise Email</h3>
              <h1 style={{ display: "inline" }}>
                $
                {switchPrice
                  ? packagesList[productIds[1]].price.year.price
                  : packagesList[productIds[1]].price.month.price}
              </h1>
              <span> per {switchPrice ? "year" : "month"}</span>
              <p style={{ color: "#00505D", fontSize: "0.9rem" }}>
                per mailbox contain 10GB
              </p>
              <ul className={classes["pricing-features"]}>
                {businessEmailFeatures.map((feature, index) => (
                  <li>
                    <TaskAltIcon color="success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={
                  switchPrice
                    ? `buynow/${productIds[1]}/year/${
                        packagesList[productIds[1]].price.year.price
                      }`
                    : `buynow/${productIds[1]}/month/${
                        packagesList[productIds[1]].price.month.price
                      }`
                }
              >
                <button
                  style={{ width: "45%", marginTop: "1rem" }}
                  className={classes["color-button"]}
                >
                  Select
                </button>
              </Link>
            </div>
          </div>
        )}
      </article>

      <article className={classes.testimonials}>
        <h1
          style={{
            marginTop: 0,
          }}
          className={classes["main-heading"]}
        >
          Testimonial
        </h1>
        <Carousel autoPlay navButtonsAlwaysVisible className={classes.carousel}>
          <div className={classes["carousel-card"]}>
            <h1>Sarah Johnson</h1>
            <p>
              I've been using Inspedium Email for my business for a few months
              now, and I couldn't be happier with the service. The email
              platform is user-friendly, and the security features give me peace
              of mind when sending sensitive information.
            </p>
            <span style={{ fontSize: "large", color: "#F5A623" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
          </div>
          <div className={classes["carousel-card"]}>
            <h1>David Kim</h1>
            <p>
              In the past, I had used Gmail, and I can say that I prefer
              Inspedium Email over Gmail. It just seems way faster to me and the
              spam filter does a better job at keeping the junk out of my inbox.
            </p>
            <span style={{ fontSize: "large", color: "#F5A623" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
          </div>
          <div className={classes["carousel-card"]}>
            <h1>Emily Lee</h1>
            <p>
              I highly recommend Inspedium Email for any business looking for a
              professional email solution. The customer service team is always
              available to help, and the uptime is unparalleled.
            </p>
            <span style={{ fontSize: "large", color: "#F5A623" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
          </div>
          <div className={classes["carousel-card"]}>
            <h1>John Martin</h1>
            <p>
              As a marketer, I rely heavily on email communication with clients
              and customers. Inspedium Email delivers on its promises of fast,
              secure, and reliable email service. I am so impressed with this
              product!
            </p>
            <span style={{ fontSize: "large", color: "#F5A623" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
          </div>
          <div className={classes["carousel-card"]}>
            <h1>Jessica Nguyen</h1>
            <p>
              The seamless transition to Inspedium Email was a game-changer for
              our team. The platform is easy to use, and the advanced features
              have improved our overall email productivity
            </p>
            <span style={{ fontSize: "large", color: "#F5A623" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
          </div>
        </Carousel>
      </article>

      <section>
        <h1 className={classes["main-heading"]}>Top Features</h1>
        <div className={classes.features}>
          <div>
            <h1>Backup</h1>
            <p>
              Our cutting-edge multi-layered backup system provides up to thirty
              days of maximum security for your data. Plus, each message is
              securely archived in all folders, so you never lose an important
              email -- even if it's accidentally deleted!
            </p>
          </div>
          <div>
            <h1>Shared Folders</h1>
            <p>
              Shared Folders make it simple to assign specific access to e-mail
              folders among colleagues. You have complete control over who has
              visibility and can modify each folder's contents. Instantly grant
              or revoke permissions with a few clicks!
            </p>
          </div>
          <div>
            <h1>Multiple Domains</h1>
            <p>
              Our Domain Aliasing feature provides a convenient way to receive
              emails for multiple domains, giving you a simpler and more
              efficient experience. This way, you can effortlessly maintain all
              communications related to these different domains without
              constantly switching between several mailboxes.
            </p>
          </div>
          <div>
            <h1>Shared Calendar</h1>
            <p>
              The Calendar component makes it easy to keep track of your
              schedule with four distinct views — Day, Week, Month and Agenda.
              Plus, you can use the event creation feature for quick access when
              scheduling appointments or meetings. To top it off, calendar
              sharing allows you to collaborate with colleagues or friends in an
              organised fashion!
            </p>
          </div>
          <div>
            <h1>Notes & Tasks</h1>
            <p>
              Taking advantage of the webmail interface can boost your
              productivity by creating and sharing working notes with colleagues
              while granting necessary permissions. You can create tasks for
              coworkers and track their progress – all within one platform!
            </p>
          </div>
          <div>
            <h1>Individual Control Panel</h1>
            <p>
              With our user-friendly Control Panel, you can easily customize
              your email account for more unique features. Create alias, set up
              forwarding options, out-of-office replies and delivery rules with
              ease - or recover emails that were accidentally deleted. The
              possibilities are endless!
            </p>
          </div>
          <button
            style={{ gridColumn: 2, margin: "2rem auto", width: "90%" }}
            onClick={() => {
              navigate("/features");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`${classes["color-button"]} ${classes["feature-button"]}`}
          >
            View All Features
          </button>
        </div>
      </section>

      <div className={classes["paw-pattern-left"]}>
        <LazyLoadImage loading="lazy" src={ltr_pat} alt="" />
      </div>

      <section className={classes.faqs}>
        <h1 className={classes["main-heading"]}>Frequently Asked Questions</h1>
        <div>
          <Faq data={faqData} />
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Landing;
