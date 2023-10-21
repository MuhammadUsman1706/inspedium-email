import React, { useRef } from "react";
import firstGrid from "../../../assets/images/about-us/first-grid.png";
import secondGrid from "../../../assets/images/about-us/second-grid.png";
import rtl_pat from "../../../assets/images/rtl_pat.png";
import ltr_pat from "../../../assets/images/ltr_pat.png";

import classes from "./AboutUs.module.css";

const AboutUs = () => {
  const activeRef = useRef();
  const resetActiveClass = () => {
    activeRef.current.classList.remove(classes.active);
  };

  return (
    <div className={classes["about-us"]}>
      <section className={classes.text}>
        <h1>About Us</h1>
        <p>
          Inspedium is a leading managed web hosting and reseller hosting
          provider based in Karachi, Pakistan. Inspedium provides customers with
          bespoke IT solutions that are tailored to their specific demands,
          which are available from state-of-the-art data center sites. Inspedium
          delivers the highest level of performance with hassle-free pricing and
          unrivaled value, as well as outstanding client support. Managed
          business web hosting, shared unlimited web hosting, cloud VPS
          solutions, dedicated servers, and reseller hosting solutions are just
          a few of the services we provide. Inspedium is a top one-stop site for
          all of your web hosting requirements, with superior and exceptional
          flexibility in the managed hosting services you pick. This includes a
          variety of managed services such as network security, system
          monitoring, data storage, video streaming, audio streaming, load
          balancing, disaster recovery services, and application management.
        </p>
      </section>

      <section className={classes["about-us-cards"]}>
        <h1 className={classes["main-heading"]}>
          How to Create a Business Email Address
        </h1>
        <div className={classes["hover-cards"]}>
          <div onMouseOver={resetActiveClass} className={classes["hover-card"]}>
            <h2>Choose Your Email Hosting Service</h2>
            <p className={classes["para-text"]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500
            </p>
          </div>

          <div
            onMouseOver={resetActiveClass}
            ref={activeRef}
            className={`${classes["hover-card"]} ${classes.active}`}
          >
            <h2>Proceed to the Checkout</h2>
            <p className={classes["para-text"]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500
            </p>
          </div>

          <div onMouseOver={resetActiveClass} className={classes["hover-card"]}>
            <h2>Start Emailing</h2>
            <p className={classes["para-text"]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500
            </p>
          </div>
        </div>
      </section>

      <div className={classes["paw-pattern-left"]}>
        <img loading="lazy" src={ltr_pat} alt="" />
      </div>

      <section className={classes.grids}>
        <div className={classes["grid-1"]}>
          <div>
            <h1>Dedication, Teamwork, Innovative and Reliable Services</h1>
            <p>
              Every one of our staff members is dedicated to providing the
              finest quality service possible, demonstrating a great deal of
              dedication while attempting to meet the expectations of our
              customers. Our company was founded on the idea that great customer
              service begins with excellent employees. Our clients benefit from
              synergistic teams that collaborate to deliver top-level
              performance in all areas of their business using Inspedium’s
              world-class web hosting services. The skills, talents, and
              expertise possessed by Inspedium’s employees are unrivaled in the
              industry, allowing us to successfully implement our solutions to
              your web hosting demands. Inspedium is a reliable business partner
              that provides businesses of all sizes with a cost-effective answer
              for all their IT infrastructure wants. Our shared cloud and
              reseller web hosting solutions allow our clients to expand their
              IT setup economically and discreetly while depending on Inspedium
              to deliver cutting-edge technology.
            </p>
          </div>
          <div>
            <img
              src={firstGrid}
              title="Dedication, Teamwork, Innovative and Reliable Services"
              alt="Dedication, Teamwork, Innovative and Reliable Services"
            />
          </div>
        </div>
        <div className={classes["grid-2"]}>
          <div>
            <img
              src={secondGrid}
              title="Commitment to Excellence"
              alt="Commitment to Excellence"
            />
          </div>
          <div>
            <h1>Commitment to Excellence</h1>
            <p>
              Our dedication to quality includes our promise to deliver
              scalable, dependable, and adaptable web hosting services.
              Inspedium strives to provide a system that is consistently
              reliable and constantly accessible to all of its clients,
              effectively delivering mission-critical services on a 24/7 basis.
              Inspedium is the one-stop shop for a wide range of IT needs
              because it offers high-value, customizable products and services
              with proactively managed solutions delivered by a team of
              certified engineers. Whether you’re looking for bespoke cage
              alternatives, unique server requirements, or total IT solutions,
              designing and implementing your IT infrastructure with your input
              and requirements can be done in a cost-effective manner. We
              provide a hands-on approach that ensures the solution you choose
              is reliable and consistent, as well as customizable and flexible
              options that are value driven with an emphasis on secure business
              continuity and exceptional customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      <div className={classes["paw-pattern-right"]}>
        <img loading="lazy" src={rtl_pat} alt="" />
      </div>
    </div>
  );
};

export default AboutUs;
