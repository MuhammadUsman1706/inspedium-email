import React, { Fragment, useState, useEffect } from "react";
import AddDomainModal from "./AddDomainModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Skeleton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import DowngradeIcon from "@mui/icons-material/TrendingDown";
import DeleteIcon from "@mui/icons-material/Delete";

import classes from "./Domain.module.css";
import { confirmAlert } from "react-confirm-alert";
import DowngradeDomainModal from "./DowngradeDomainModal";

let requestOptions;
let responseCount = 0;
let domainCopy;

const Domain = ({
  setDashboardMenu,
  setDomainId,
  domainData,
  setDomainData,
  setDomainStatus,
  setSelectedDomain,
  setSelectedDomainStats,
  refreshPage,
  setRefreshPage,
}) => {
  const auth = useSelector((state) => state.auth);

  const [searchParam, setSearchParam] = useState("");
  const [openDowngradeModal, setOpenDowngradeModal] = useState(false);

  const changeDomainStatusHandler = (event, domainId) => {
    let responseWait;

    const formData = new FormData();
    formData.append("domainstatus", event.target.checked);
    requestOptions.method = "POST";
    requestOptions.body = formData;

    const getResponse = async () => {
      const response = await fetch(
        `https://api.inspedium.email/domain-setting?domain=${domainId}`,
        requestOptions
      );

      const responseData = await response.json();

      toast.info(responseData.info.msg);

      const index = domainData.findIndex(
        (domain) => domain.domain === domainId
      );
      const updatedDomain = domainData;
      updatedDomain[index].status = event.target.checked;
      setDomainData(updatedDomain);
    };

    if (responseCount > 0) {
      clearTimeout(responseWait);
      responseWait = setTimeout(() => getResponse(), 3000);
    } else {
      getResponse();
      responseCount++;
    }
    // console.log(event.target.checked);
  };

  const deleteDomainHandler = (domainName, subscriptionId, productName) => {
    const businessId = localStorage.getItem("businessId");
    const enterpriseId = localStorage.getItem("enterpriseId");
    requestOptions.method = "POST";
    requestOptions.body = JSON.stringify({
      domain: domainName,
      subscriptionId,
      plan_id: productName === "Business Emails" ? businessId : enterpriseId,
    });

    confirmAlert({
      title: "Warning!",
      message:
        "Are you sure you want to delete this domain? Please keep in mind that all your related data, such as mailboxes, email alises, etc. will be erased! This action is irrevesible!",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetch(
              "https://api.inspedium.email/cancel-subscription",
              requestOptions
            );
            const responseData = await response.json();

            if (responseData?.domain?.returncode === 1) {
              toast.success(responseData.domain?.returndata);
              const filteredDomainData = domainData.filter(
                (domain) => domain.domain !== domainName
              );
              setDomainData(filteredDomainData);
              domainCopy = filteredDomainData;
              // localStorage.setItem("lastDomainName", "");
              localStorage.removeItem("lastDomainName");
            } else {
              toast.error("An error occurred, please try later!");
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

  useEffect(() => {
    if (!domainData || refreshPage) {
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      myHeaders.append("uuid", auth.id);

      requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://api.inspedium.email/domain-list?user_id=${auth.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setDomainData(result.list);
          domainCopy = result.list;
          if (result.list.length > 0) {
            const domainName =
              localStorage.getItem("lastDomainName") || result.list[0].domain;
            setSelectedDomain(domainName);
            fetch(
              `https://api.inspedium.email/domain-stats?domain=${domainName}`,
              requestOptions
            ).then((response) =>
              response.json().then((responseData) => {
                setSelectedDomainStats(responseData);
              })
            );
          }
        })
        .catch((error) => console.log("error", error));
      setRefreshPage(false);
    }
  }, [refreshPage]);

  useEffect(() => {
    if (domainData && domainCopy) {
      const filteredDomains = domainCopy.filter((domain) =>
        domain.domain.toLowerCase().includes(searchParam.toLowerCase())
      );

      setDomainData(filteredDomains);
    }
  }, [searchParam]);

  // console.log(domainData);

  return (
    <div className={classes.domain}>
      <div className={classes["top-bar"]}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          onSubmit={(event) => event.preventDefault()}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Domain"
            disabled={!domainData}
            onChange={(event) => setSearchParam(event.target.value)}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        {/* <button
          onClick={() => setOpenCreateModal(true)}
          className={classes["color-button"]}
        >
          Create
        </button> */}
      </div>
      <div className={classes["domain-table"]}>
        <table>
          <thead>
            <tr>
              <th>Domain Name</th>
              <th>Status</th>
              <th>Type</th>
              <th>No of Mailbox</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {domainData ? (
              domainData.length > 0 ? (
                domainData.map((domain) => (
                  <tr key={domain.domain}>
                    <th>
                      <span className={classes["table-text"]}>
                        {domain.domain}
                      </span>
                    </th>
                    <th>
                      {/* <span>
                        <label class={classes.switch}>
                          <input
                            type="checkbox"
                            defaultChecked={domain.status}
                            onChange={(event) =>
                              changeDomainStatusHandler(event, domain.domain)
                            }
                          />
                          <span
                            class={`${classes.slider} ${classes.round}`}
                          ></span>
                        </label>
                      </span> */}
                      {/* <span className={classes["table-text"]}> */}
                      {domain.status ? "Activated" : "Deactivated"}
                      {/* </span> */}
                    </th>
                    <th>
                      <span className={classes["table-text"]}>
                        {domain.product_name}
                      </span>
                    </th>
                    <th>
                      <span className={classes["table-text"]}>
                        {domain.no_mailbox}
                      </span>
                    </th>
                    <th>
                      <span className={classes.setting}>
                        <Tooltip title="Downgrade Domain">
                          <DowngradeIcon
                            onClick={() => {
                              setOpenDowngradeModal(domain.domain);
                              // setDashboardMenu(domain.domain);
                              // setDomainId(domain.domain);
                              // setDomainStatus(domain.status);
                            }}
                          />
                        </Tooltip>
                      </span>
                    </th>
                    <th>
                      <span className={classes.setting}>
                        <Tooltip title="Domain Settings">
                          <SettingsIcon
                            onClick={() => {
                              setDashboardMenu(domain.domain);
                              setDomainId(domain.domain);
                              setDomainStatus(domain.status);
                            }}
                          />
                        </Tooltip>
                      </span>
                    </th>
                    <th>
                      <span className={classes.setting}>
                        <Tooltip title="Delete Domain">
                          <DeleteIcon
                            onClick={() => {
                              deleteDomainHandler(
                                domain.domain,
                                domain.subscriptionId,
                                domain.product_name
                              );
                            }}
                          />
                        </Tooltip>
                      </span>
                    </th>
                  </tr>
                ))
              ) : (
                <tr className={classes.fallback}>
                  <th>
                    <span className={classes["table-text"]}>
                      No Domain Found
                    </span>
                  </th>
                  <th>-</th>
                  <th>-</th>
                  <th>-</th>
                </tr>
              )
            ) : (
              <Fragment>
                {[...Array(3)].map(() => (
                  <tr>
                    <th>
                      <Skeleton />
                    </th>
                    <th>
                      <Skeleton />
                    </th>
                    <th>
                      <Skeleton />
                    </th>
                    <th>
                      <Skeleton />
                    </th>
                    <th>
                      <Skeleton />
                    </th>
                    <th>
                      <Skeleton />
                    </th>
                    <th>
                      <Skeleton />
                    </th>
                  </tr>
                ))}
              </Fragment>
            )}
          </tbody>
        </table>
      </div>
      {/* <AddDomainModal open={openCreateModal} setOpen={setOpenCreateModal} /> */}
      {openDowngradeModal && (
        <DowngradeDomainModal
          open={openDowngradeModal}
          setOpen={setOpenDowngradeModal}
          domainData={domainData}
          setRefreshPage={setRefreshPage}
        />
      )}
    </div>
  );
};

export default Domain;
