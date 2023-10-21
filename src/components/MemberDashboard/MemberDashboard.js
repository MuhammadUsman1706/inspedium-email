import React, { useState, useEffect } from "react";
import SideBar from "./MemberDashboardElements/SideBar";
import TopBar from "./MemberDashboardElements/TopBar";
import Domain from "./MemberDashboardElements/Domain/Domain";
import DomainSetting from "./MemberDashboardElements/Domain/DomainSetting";
import Profile from "./MemberDashboardElements/Profile/Profile";
import Email from "./MemberDashboardElements/Email/Email";
import PaymentInfo from "./MemberDashboardElements/PaymentInfo/PaymentInfo";
import Invoices from "./MemberDashboardElements/Invoices/Invoices";
import SupportTicket from "./MemberDashboardElements/SupportTicket/SupportTicket";
import { Box, Drawer } from "@mui/material";

import classes from "./MemberDashboard.module.css";

const MemberDashboard = () => {
  const [dashboardMenu, setDashboardMenu] = useState("Domain");
  const [drawerState, setDrawerState] = useState(false);
  // Domain
  const [domainId, setDomainId] = useState(null);
  const [domainData, setDomainData] = useState(null);
  const [domainStatus, setDomainStatus] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);
  // Email
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDomainStats, setSelectedDomainStats] = useState(null);
  const [selectedEmailAlises, setSelectedEmailAliases] = useState(null);
  const [selectedGroupList, setSelectedGroupList] = useState(null);
  const [selectedSmartGroupList, setSelectedSmartGroupList] = useState(null);
  // Payment
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  // Invoice
  const [invoiceInfo, setInvoiceInfo] = useState(null);

  const toggleDrawer = () => setDrawerState((prevState) => !prevState);

  useEffect(() => {
    const lastTabVisited = localStorage.getItem("lastTabVisited");
    if (lastTabVisited) {
      setDashboardMenu(lastTabVisited);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastTabVisited", dashboardMenu);
  }, [dashboardMenu]);

  return (
    <div className={classes.dashboard}>
      {window.innerWidth > 800 ? (
        <SideBar
          domainId={domainId}
          dashboardMenu={dashboardMenu}
          setDashboardMenu={setDashboardMenu}
          setDomainId={setDomainId}
        />
      ) : (
        <Drawer
          PaperProps={{
            sx: {
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            },
          }}
          anchor={"left"}
          open={drawerState}
          onClose={toggleDrawer}
        >
          <Box
            sx={{
              width: 250,
              overflow: "hidden",
            }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <SideBar
              domainId={domainId}
              dashboardMenu={dashboardMenu}
              setDashboardMenu={setDashboardMenu}
              setDomainId={setDomainId}
            />
          </Box>
        </Drawer>
      )}

      <div className={classes["dashboard-display"]}>
        <TopBar
          dashboardMenu={dashboardMenu}
          setDashboardMenu={setDashboardMenu}
          toggleDrawer={toggleDrawer}
        />
        {dashboardMenu === "Domain" && (
          <Domain
            setDashboardMenu={setDashboardMenu}
            setDomainId={setDomainId}
            domainData={domainData}
            setDomainData={setDomainData}
            setDomainStatus={setDomainStatus}
            setSelectedDomain={setSelectedDomain}
            setSelectedDomainStats={setSelectedDomainStats}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
          />
        )}
        {dashboardMenu === "Email" && (
          <Email
            domainData={domainData}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            selectedDomainStats={selectedDomainStats}
            setSelectedDomainStats={setSelectedDomainStats}
            selectedEmailAlises={selectedEmailAlises}
            setSelectedEmailAliases={setSelectedEmailAliases}
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            setDashboardMenu={setDashboardMenu}
            setRefreshPage={setRefreshPage}
            selectedGroupList={selectedGroupList}
            setSelectedGroupList={setSelectedGroupList}
            setInvoiceInfo={setInvoiceInfo}
            selectedSmartGroupList={selectedSmartGroupList}
            setSelectedSmartGroupList={setSelectedSmartGroupList}
          />
        )}
        {dashboardMenu === "Profile" && <Profile />}
        {dashboardMenu === "Support Ticket" && <SupportTicket />}
        {/* {paymentIntentInfo.clientSecret && (
          <Elements stripe={stripePromise} options={options}> */}
        {dashboardMenu === "Payment Info" && (
          <PaymentInfo
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            selectedCardIndex={selectedCardIndex}
            setSelectedCardIndex={setSelectedCardIndex}
            information={true}
          />
        )}
        {/* </Elements>
        )} */}
        {dashboardMenu === "Invoices" && (
          <Invoices invoiceInfo={invoiceInfo} setInvoiceInfo={setInvoiceInfo} />
        )}

        {domainId && (
          <DomainSetting
            setDashboardMenu={setDashboardMenu}
            domainStatus={domainStatus}
            domainId={domainId}
            setDomainId={setDomainId}
          />
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
