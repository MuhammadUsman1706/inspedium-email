import React, { Fragment, useEffect, useState } from "react";
import MainPage from "./EmailElements/MainPage";
import EditEmail from "./EmailElements/MainPageElements/EditEmail";
import UpgradeEmailStepper from "./EmailElements/MainPageElements/UpgradeEmailStepper";
import ViewGroupList from "./EmailElements/MainPageElements/ViewGroupList";

const Email = ({
  domainData,
  selectedDomain,
  setSelectedDomain,
  selectedDomainStats,
  setSelectedDomainStats,
  selectedEmailAlises,
  setSelectedEmailAliases,
  selectedGroupList,
  setSelectedGroupList,
  paymentInfo,
  setPaymentInfo,
  setDashboardMenu,
  setRefreshPage,
  setInvoiceInfo,
  selectedSmartGroupList,
  setSelectedSmartGroupList,
}) => {
  const [mode, setMode] = useState("mainPage");
  const [editingEmail, setEditingEmail] = useState("");
  const [viewGroup, setViewGroup] = useState("");
  const [mainPageMode, setMainPageMode] = useState("mailbox");

  // Data States
  // const [selectedDomain, setSelectedDomain] = useState("");
  // const [selectedDomainStats, setSelectedDomainStats] = useState(null);

  useEffect(() => {
    const lastPage = localStorage.getItem("lastEmailPage");
    lastPage && setMode(lastPage);
  }, []);

  useEffect(() => {
    localStorage.setItem("lastEmailPage", mode);
  }, [mode]);

  return (
    <Fragment>
      {mode === "mainPage" && (
        <MainPage
          domainData={domainData}
          setMode={setMode}
          setEditingEmail={setEditingEmail}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedDomainStats={selectedDomainStats}
          setSelectedDomainStats={setSelectedDomainStats}
          selectedEmailAlises={selectedEmailAlises}
          setSelectedEmailAliases={setSelectedEmailAliases}
          selectedGroupList={selectedGroupList}
          setSelectedGroupList={setSelectedGroupList}
          setViewGroup={setViewGroup}
          mainPageMode={mainPageMode}
          setMainPageMode={setMainPageMode}
          selectedSmartGroupList={selectedSmartGroupList}
          setSelectedSmartGroupList={setSelectedSmartGroupList}
        />
      )}
      {mode === "upgradeEmail" && (
        <UpgradeEmailStepper
          domainData={domainData}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedDomainStats={selectedDomainStats}
          setSelectedDomainStats={setSelectedDomainStats}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          setMode={setMode}
          setDashboardMenu={setDashboardMenu}
          setRefreshPage={setRefreshPage}
          setInvoiceInfo={setInvoiceInfo}
        />
      )}
      {mode === "editEmail" && (
        <EditEmail
          selectedDomain={selectedDomain}
          setSelectedDomainStats={setSelectedDomainStats}
          setMode={setMode}
          editingEmail={editingEmail}
        />
      )}
      {mode === "viewGroup" && (
        <ViewGroupList
          selectedDomain={selectedDomain}
          viewGroup={viewGroup}
          setMode={setMode}
          setMainPageMode={setMainPageMode}
        />
      )}
    </Fragment>
  );
};

export default Email;
