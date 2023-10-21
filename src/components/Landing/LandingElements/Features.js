import React, { useEffect } from "react";
import one from "../../../assets/images/features/1.png";
import two from "../../../assets/images/features/2.png";
import three from "../../../assets/images/features/3.png";
import four from "../../../assets/images/features/4.png";
import five from "../../../assets/images/features/5.png";
import six from "../../../assets/images/features/6.png";
import seven from "../../../assets/images/features/7.png";
import eight from "../../../assets/images/features/8.png";
import nine from "../../../assets/images/features/9.png";
import ten from "../../../assets/images/features/10.png";
import eleven from "../../../assets/images/features/11.png";
import twelve from "../../../assets/images/features/12.png";
import thirteen from "../../../assets/images/features/13.png";
import fourteen from "../../../assets/images/features/14.png";
import fifteen from "../../../assets/images/features/15.png";
import sixteen from "../../../assets/images/features/16.png";
import first from "../../../assets/images/features/first.png";
import second from "../../../assets/images/features/second.png";
import third from "../../../assets/images/features/third.png";
import fourth from "../../../assets/images/features/fourth.png";
import fifth from "../../../assets/images/features/fifth.png";
import sixth from "../../../assets/images/features/sixth.png";
import seventh from "../../../assets/images/features/seventh.png";
import eighth from "../../../assets/images/features/eighth.png";
import ninth from "../../../assets/images/features/ninth.png";
import tenth from "../../../assets/images/features/tenth.png";
import eleventh from "../../../assets/images/features/eleventh.png";
import twelveth from "../../../assets/images/features/twelveth.png";
import thirteenth from "../../../assets/images/features/thirteenth.png";
import fourteenth from "../../../assets/images/features/fourteenth.png";
import fifteenth from "../../../assets/images/features/fifteenth.png";
import sixteenth from "../../../assets/images/features/sixteenth.png";
import ltr_pat from "../../../assets/images/ltr_pat.png";
import rtl_pat from "../../../assets/images/rtl_pat.png";

import classes from "./Features.module.css";

const Features = () => {
  // useEffect(() => {
  //   console.log("Set Screeen Width");
  //   // const background = document.querySelector(".halfscreen");
  //   const el = document.querySelector(`.${classes.text}`);
  //   let elHeight = el.offsetHeight;
  //   elHeight += parseInt(
  //     window.getComputedStyle(el).getPropertyValue("margin-top")
  //   );
  //   elHeight += parseInt(
  //     window.getComputedStyle(el).getPropertyValue("margin-bottom")
  //   );
  //   document.querySelector(".halfscreen").style.height = 1000 + "px";
  //   // console.log(background.style.height);
  // }, []);

  return (
    <div>
      <section className={classes.text}>
        <h1>Inspedium.Email Features</h1>
        <p>
          Inspedium.Email is the perfect email service for businesses! Our
          complete suite of features allows you to manage your company’s emails
          with ease. From secure protection and storage to automated filters and
          workflow tools, Inspedium.Email has all the features you need ensure
          your business runs smoothly. Sign up today and take advantage of our
          comprehensive services!
        </p>
      </section>

      <article>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={one}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Out of Office Reply / Auto Responder / Vacation Message</h1>
            <p>
              Make your life easier by setting up an auto-response to any
              messages you receive while away from the office. With the Out of
              Office feature, you can customize a text or HTML message that will
              be sent automatically whenever someone sends you a message!
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img
              src={first}
              alt="Out of Office Reply / Auto Responder / Vacation Message"
              title="Out of Office Reply / Auto Responder / Vacation Message"
            />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img loading="lazy" src={second} alt="Backups" title="Backups" />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={two}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Backups:</h1>
            <p>
              You can rest easy knowing that your information is always secure
              with us. Our multi-layered backup system protects all data and
              maintains up to one month's worth of backups for extra security.
              Put your trust in us - we guarantee lasting safety for every bit
              of information you provide!
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={three}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Domain Alias:</h1>
            <p>
              Our Domain Aliasing feature allows you to receive emails from
              multiple domains in a single inbox. For example, if someone sends
              an email to john@aliasdomain.com it can be sent directly to
              john@yourmaindomain.com without Joe having to check several
              mailboxes – saving him time and energy!
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img
              loading="lazy"
              src={third}
              alt="Domain Alias"
              title="Domain Alias"
            />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img
              src={fourth}
              alt="Shared Mailbox Folders"
              title="Shared Mailbox Folders"
            />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={four}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Shared Mailbox Folders:</h1>
            <p>
              Shared Folders provide an effortless way of giving your co-workers
              access to specific email folders. You have the power to decide
              which user can peek into each folder and whether they are able
              only to view or modify it too. Any shared folder with you will be
              accessible under a unique label named 'shared' in your IMAP
              directory list.
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={five}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Address Book:</h1>
            <p>
              With the click of a button, you can easily build your contact list
              and securely share it with colleagues, complete with permissions.
              This allows for streamlined collaboration and peace-of-mind,
              knowing that all personal information is safeguarded from
              unauthorised access. Create your contacts list today and start
              enjoying effortless cooperation!
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img
              loading="lazy"
              src={fifth}
              alt="Address Book"
              title="Address Book"
            />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img loading="lazy" src={sixth} alt="Calendars" title="Calendars" />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={six}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Calendars:</h1>
            <p>
              The Calendar component is designed to make your life easier,
              enabling you to create and manage calendars easily. With four
              distinct views (Day, Week, Month and Agenda) available for viewing
              and the ability to quickly create events and share them among
              multiple users - it's never been simpler! The power of this
              feature allows you to plan out each day better so that everything
              is noticed and remembered.
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={seven}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Tasks:</h1>
            <p>
              Tasks can help you reach peak efficiency with your to-do list.
              From creating reminders and assigning deadlines, Tasks helps you
              organise how much time is left to tackle the most critical tasks,
              allowing maximum productivity! Tracking and managing multiple
              projects has never been simpler or more manageable than it is with
              Tasks.
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img loading="lazy" src={seventh} alt="Tasks" title="Tasks" />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img
              loading="lazy"
              src={eighth}
              alt="Control Panels"
              title="Control Panels"
            />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={eight}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Control Panels:</h1>
            <p>
              Easily personalise your email account with our Control Panel!
              Create forwards, alias, and out-of-office replies. Set delivery
              rules for incoming emails, restore messages you've accidentally
              deleted, and explore other available features. You can access the
              panel directly from webmail - it's that easy!
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={nine}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Notes:</h1>
            <p>
              Maximise your team's efficiency and productivity by creating
              insightful notes that can be easily shared with colleagues.
              Introduce enhanced visibility, communication, and collaboration as
              you customise user permissions to access the information securely.
              Seamless integration allows for quick real-time updates across all
              platforms—keeping everyone informed of progress no matter where
              they are located.
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img loading="lazy" src={ninth} alt="Notes" title="Notes" />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img
              src={tenth}
              alt="Personal Support"
              title="Personal Support"
              style={{ width: "90%" }}
            />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={ten}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Personal Support</h1>
            <p>
              Forget robots and automated messages! Instead, you can talk with
              real people when you need help. Our incredible support team is
              available to answer any questions or assist in solving issues
              quickly, whether it's via chat, e-mail, or phone call. This way,
              you get the correct answers fast and don't waste precious time
              trying to troubleshoot independently.
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={eleven}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Whitelist & Blacklist:</h1>
            <p>
              Our Control Panel allows you to whitelist any email address,
              domain or IP address so that you'll always get essential emails
              from the sender. Conversely, their mail will be directly sent to
              your Spam folder if they are blacklisted. This way, we ensure that
              every message is received and remains secure.
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img
              src={eleventh}
              alt="Whitelist & Blacklist"
              title="Whitelist & Blacklist"
            />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img
              src={twelveth}
              alt="Email Forwarders"
              title="Email Forwarders"
            />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={twelve}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Email Forwarders:</h1>
            <p>
              With Forwarders, you can opt to have your incoming messages sent
              directly to another account while preserving their original
              destination. This way, you get the best of both worlds -
              maintaining local delivery and receiving copies at a different
              address!
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={thirteen}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Advanced Spam & Virus Filtering:</h1>
            <p>
              To ensure that legitimate users have seamless communication while
              malicious Spam & Viruses are nipped in the bud, we created our
              filtering solution which guarantees an accuracy rate of 99%+.
              Here's how it works: Our sophisticated and cutting-edge filtering
              system was designed to filter out potentially harmful or
              disruptive content with unparalleled precision. We pride ourselves
              on being able to provide you with a secure environment for your
              communication needs.
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img
              src={thirteenth}
              alt="Advanced Spam & Virus Filtering"
              title="Advanced Spam & Virus Filtering"
            />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img
              src={fourteenth}
              style={{ width: "60%" }}
              alt="Message Delivery Rules"
              title="Message Delivery Rules"
            />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={fourteen}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Message Delivery Rules:</h1>
            <p>
              Easily direct your messages to the desired destination based on
              personal criteria. With user-defined rules, you can seamlessly
              route each incoming message into designated folders or e-mail
              accounts with a few simple clicks.
            </p>
          </div>
        </div>
        <div className={classes["rtl-grid"]}>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={fifteen}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Two Factor Authentication:</h1>
            <p>
              Two-factor authentication (or 2FA) bolsters the security of your
              login process by adding a layer of verification. This extra step
              is a crucial safeguard against unauthorised access and can help
              keep your data safe from malicious actors. By using 2FA, you can
              rest assured that only those with the proper credentials can
              access your accounts!
            </p>
          </div>
          <div className={classes["grid-image"]}>
            <img
              src={fifteenth}
              alt="Two Factor Authentication"
              title="Two Factor Authentication"
            />
            <img loading="lazy" src={rtl_pat} alt="" />
          </div>
        </div>
        <div className={classes["ltr-grid"]}>
          <div className={classes["grid-image"]}>
            <img
              src={sixteenth}
              loading="lazy"
              style={{ width: "70%" }}
              alt="Search Folders"
              title="Search Folders"
            />
            <img loading="lazy" src={ltr_pat} style={{ left: 0 }} alt="" />
          </div>
          <div className={classes["grid-text"]}>
            <img
              loading="lazy"
              src={sixteen}
              className={classes["rtl-image"]}
              alt=""
            />
            <h1>Search Folders:</h1>
            <p>
              Construct custom Search Folders to skim through and review
              specific messages effortlessly. With this feature, you'll be able
              to stay organised and up to date, avoiding the hassle of sifting
              through irrelevant content.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Features;
