import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateAliasModal from "./MainPageElements/CreateAliasModal";
import CreateEmailModal from "./MainPageElements/CreateEmailModal";
import CreateGroupModal from "./MainPageElements/CreateGroupModal";
import CreateBulkEmailModal from "./MainPageElements/CreateBulkEmailModal";
import ViewDetails from "./MainPageElements/ViewDetails";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PublicIcon from "@mui/icons-material/Public";

import classes from "./MainPage.module.css";
import "react-confirm-alert/src/react-confirm-alert.css";

let requestOptions;
let emailAliasesCopy;
let domainStatsCopy;
let groupListCopy;
let smartGroupListCopy;

const MainPage = ({
  setMode,
  setEditingEmail,
  setViewGroup,
  domainData,
  selectedDomain,
  setSelectedDomain,
  selectedDomainStats,
  setSelectedDomainStats,
  selectedEmailAlises,
  setSelectedEmailAliases,
  selectedGroupList,
  setSelectedGroupList,
  mainPageMode,
  setMainPageMode,
  selectedSmartGroupList,
  setSelectedSmartGroupList,
}) => {
  const auth = useSelector((state) => state.auth);
  const [searchParam, setSearchParam] = useState("");
  // const [mainPageMode, setMainPageMode] = useState("mailbox");
  const [modalMode, setModalMode] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    if (event) {
      var currentDomain = event.target.value;
      setSelectedDomain(currentDomain);
    }
    const response = await fetch(
      `https://api.inspedium.email/domain-stats?domain=${
        currentDomain ? currentDomain : selectedDomain
      }`,
      requestOptions
    );

    const responseData = await response.json();

    setSelectedDomainStats(responseData);
    localStorage.setItem(
      "lastDomainName",
      currentDomain ? currentDomain : selectedDomain
    );
    domainStatsCopy = responseData.email_list;
  };

  const deleteMailboxHandler = async (email) => {
    confirmAlert({
      title: "Warning",
      message:
        "Are you sure you want to delete this mailbox? Please note that this action is irreversible.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            requestOptions.method = "GET";
            const response = await fetch(
              `https://api.inspedium.email/mailbox-remove?domain=${selectedDomain}&email=${email}`,
              requestOptions
            );

            const responseData = await response.json();

            if (responseData.returncode === 1) {
              toast.success(responseData.returndata);
              handleChange();
              // const filteredEmailList = selectedDomainStats.email_list.filter(
              //   (emailDetail) => emailDetail.email !== email
              // );
              // setSelectedDomainStats((prevState) => ({
              //   ...prevState,
              //   email_list: filteredEmailList,
              // }));
            } else {
              toast.error("Some error might have occurred.");
            }
            // console.log(responseData);
          },
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };

  const deleteAliasHandler = async (alias) => {
    confirmAlert({
      title: "Warning",
      message:
        "Are you sure you want to delete this alias? Please note that this action is irreversible.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const formData = new FormData();
            formData.append("alias", alias);

            requestOptions.method = "POST";
            requestOptions.body = formData;

            const response = await fetch(
              `https://api.inspedium.email/removeEmail-alias?domain=${selectedDomain}`,
              requestOptions
            );
            delete requestOptions.body;
            const responseData = await response.json();
            if (responseData.success === 1) {
              toast.success(responseData.msg);
              const filteredAliasList = selectedEmailAlises.filter(
                (aliasDetail) => aliasDetail.alias !== alias
              );
              setSelectedEmailAliases(filteredAliasList);
            } else {
              toast.error(responseData.msg);
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };

  const deleteGroupHandler = async (groupName, isSmart) => {
    confirmAlert({
      title: "Warning",
      message:
        "Are you sure you want to delete this group? Please note that this action is irreversible.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            requestOptions.method = "POST";

            if (isSmart) {
              var response = await fetch(
                `https://api.inspedium.email/removeSmartList?domain=${selectedDomain}&groupName=${groupName}`,
                requestOptions
              );
            } else {
              var response = await fetch(
                `https://api.inspedium.email/removeList?domain=${selectedDomain}&groupName=${groupName}`,
                requestOptions
              );
            }

            const responseData = await response.json();
            if (responseData.success === 1) {
              toast.success(responseData.msg);
              if (isSmart) {
                const filteredGroupList = selectedSmartGroupList.filter(
                  (group) => group.name !== groupName
                );
                setSelectedSmartGroupList(filteredGroupList);
                smartGroupListCopy = smartGroupListCopy.filter(
                  (group) => group.name !== groupName
                );
              } else {
                const filteredGroupList = selectedGroupList.filter(
                  (group) => group !== groupName
                );
                setSelectedGroupList(filteredGroupList);
                groupListCopy = groupListCopy.filter(
                  (group) => group !== groupName
                );
              }
            } else {
              toast.error(responseData.msg);
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };

  const loginWebmailHandler = async (email) => {
    if (loading) return;
    setLoading(true);
    try {
      toast.info("Redirecting, Please Wait...");
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

      const response = await fetch(
        `https://api.inspedium.email/login-webmail?domain=${selectedDomain}&email=${email}`,
        requestOptions
      );
      const responseData = await response.json();

      var newWindow = window.open();
      newWindow.document.write(
        `<html>
      <body>
         <form action='https://${responseData.details.url}' method='POST' target='' id='webmail'>
            <input type='hidden' name='accessToken' value='${responseData.details.token}'>
            <input type='hidden' name='password' value='${responseData.details.otp}'>
            <input type='hidden' id="redirect" type='submit' class='btn btn-info' value='Webmail'>
         </form>
         <head>
            <script>
               var button = document.getElementById('redirect');
               button.form.submit();  
            </script>
         </head>
      </body>
   </html>`
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const fetchEmailAliases = () => {
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
      `https://api.inspedium.email/email-alias?domain=${selectedDomain}`,
      requestOptions
    ).then((response) =>
      response.json().then((responseData) => {
        setSelectedEmailAliases(responseData.alias);
        emailAliasesCopy = responseData.alias;
      })
    );
  };

  const fetchGroupList = () => {
    requestOptions.method = "GET";
    fetch(
      // `https://api.inspedium.email/grouplist?domain=${selectedDomain}`,
      `https://api.inspedium.email/smartgrouplist?domain=${selectedDomain}`,
      requestOptions
    ).then((response) =>
      response.json().then((responseData) => {
        if (responseData.success) {
          setSelectedSmartGroupList(responseData.list);
          smartGroupListCopy = responseData.list;
        }
      })
    );

    fetch(
      `https://api.inspedium.email/grouplist?domain=${selectedDomain}`,
      requestOptions
    ).then((response) =>
      response.json().then((responseData) => {
        if (responseData.success) {
          setSelectedGroupList(responseData.list);
          groupListCopy = responseData.list;
        }
      })
    );
  };

  // const refreshGroupList = (newGroup) => {
  //   setSelectedGroupList((prevState) => [...prevState, newGroup]);
  //   groupListCopy.push(newGroup);
  // };

  useEffect(() => {
    fetchEmailAliases();
    fetchGroupList();
    domainStatsCopy = selectedDomainStats?.email_list;
  }, [selectedDomain]);

  useEffect(() => {
    if (!domainStatsCopy) {
      domainStatsCopy = selectedDomainStats?.email_list;
    }

    const searchParamLower = searchParam.toLowerCase();

    if (mainPageMode === "mailbox") {
      if (selectedDomainStats && domainStatsCopy) {
        const filteredMailboxes = domainStatsCopy.filter((email) =>
          email.email.toLowerCase().includes(searchParamLower)
        );
        setSelectedDomainStats((prevState) => ({
          ...prevState,
          email_list: filteredMailboxes,
        }));
      }
    } else if (mainPageMode === "emailAlias") {
      if (selectedEmailAlises && emailAliasesCopy) {
        const filteredEmailAliases = emailAliasesCopy.filter((alias) =>
          alias.alias.toLowerCase().includes(searchParamLower)
        );
        setSelectedEmailAliases(filteredEmailAliases);
      }
    } else {
      if (selectedGroupList && groupListCopy) {
        const filteredGroupList = groupListCopy.filter((group) =>
          group.toLowerCase().includes(searchParamLower)
        );
        const filteredSmartGroupList = smartGroupListCopy.filter((group) =>
          group.name.toLowerCase().includes(searchParamLower)
        );
        setSelectedGroupList(filteredGroupList);
        setSelectedSmartGroupList(filteredSmartGroupList);
      }
    }
  }, [searchParam, mainPageMode]);

  useEffect(() => {
    const lastMainPageTabVisited = localStorage.getItem(
      "lastMainPageTabVisited"
    );

    if (lastMainPageTabVisited) {
      setMainPageMode(lastMainPageTabVisited);
    }

    return () => {
      if (domainStatsCopy) {
        setSelectedDomainStats((prevState) => ({
          ...prevState,
          email_list: domainStatsCopy,
        }));
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("lastMainPageTabVisited", mainPageMode);
  }, [mainPageMode]);

  return (
    <div className={classes["main-page"]}>
      <div className={classes["top-bar"]}>
        <FormControl
          sx={
            window.innerWidth > 500
              ? { minWidth: "25%", maxWidth: "300px" }
              : { minWidth: "100%" }
          }
        >
          <InputLabel id="domainName">Domain Name</InputLabel>
          <Select
            labelId="domainName"
            id="domainName"
            value={selectedDomain}
            label="domainName"
            fullWidth
            onChange={handleChange}
            // onChange={setSelectedDomain}
            // defaultValue={10}
          >
            {domainData &&
              domainData.map((domain) => (
                <MenuItem key={domain.domain} value={domain.domain}>
                  <span
                    className={classes["domain-name"]}
                  >{`${domain.domain} (${domain.product_name})`}</span>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <div>
          <CircularProgress
            variant="determinate"
            value={
              (selectedDomainStats?.mailbox_created /
                selectedDomainStats?.total_mailBox) *
              100
            }
          />
          <p>
            {selectedDomainStats?.mailbox_created
              ? selectedDomainStats?.mailbox_created
              : " - "}{" "}
            /{" "}
            {selectedDomainStats?.total_mailBox
              ? selectedDomainStats?.total_mailBox
              : " - "}
            &nbsp;mailbox
          </p>
        </div>
        <div>
          <CircularProgress
            variant="determinate"
            value={
              (selectedDomainStats?.total_allocated_space /
                selectedDomainStats?.total_storage) *
              100
            }
          />
          <p>
            {selectedDomainStats?.total_allocated_space
              ? selectedDomainStats?.total_allocated_space
              : " - "}
            GB /{" "}
            {selectedDomainStats?.total_storage
              ? selectedDomainStats?.total_storage
              : " - "}
            &nbsp;GB storage
          </p>
        </div>
        <button
          onClick={() => setMode("upgradeEmail")}
          className="color-button"
        >
          Upgrade
        </button>
      </div>

      <div className={classes["bottom-bar"]}>
        <div className={classes["main-tabs"]}>
          <button
            style={{
              marginLeft: 0,
            }}
            onClick={() => setMainPageMode("mailbox")}
            className={
              mainPageMode === "mailbox"
                ? "color-button"
                : "color-inverse-button"
            }
          >
            Mailbox
          </button>
          <button
            style={{
              marginLeft: "1rem",
            }}
            onClick={() => setMainPageMode("emailAlias")}
            className={
              mainPageMode === "emailAlias"
                ? "color-button"
                : "color-inverse-button"
            }
          >
            Email Alias
          </button>
          <button
            style={{
              marginLeft: "1rem",
            }}
            onClick={() => setMainPageMode("groupList")}
            className={
              mainPageMode === "groupList"
                ? "color-button"
                : "color-inverse-button"
            }
          >
            Group List
          </button>
        </div>
        <div className={classes["search-button"]}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "50%",
              maxWidth: "100%",
            }}
            onSubmit={(event) => event.preventDefault()}
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              onChange={(event) => setSearchParam(event.target.value)}
              disabled={
                selectedDomainStats && selectedEmailAlises ? false : true
              }
              inputProps={{ "aria-label": "search email" }}
            />
          </Paper>
          <div className={classes.buttons}>
            {mainPageMode === "mailbox" && (
              <button
                onClick={() => setModalMode("createBulkEmail")}
                className="color-button"
              >
                Create Bulk Mailboxes
              </button>
            )}
            <button
              onClick={() =>
                setModalMode(
                  mainPageMode === "mailbox"
                    ? "createEmail"
                    : mainPageMode === "emailAlias"
                    ? "createAlias"
                    : "createGroup"
                )
              }
              className="color-button"
            >
              Create
            </button>
          </div>
        </div>

        {modalMode && (
          <Fragment>
            {modalMode === "createAlias" && (
              <CreateAliasModal
                setOpen={setModalMode}
                selectedDomain={selectedDomain}
                open={true}
                refreshData={fetchEmailAliases}
              />
            )}
            {(modalMode === "createGroup" || modalMode === "editGroup") && (
              <CreateGroupModal
                open={true}
                setOpen={setModalMode}
                selectedDomain={selectedDomain}
                refreshData={fetchGroupList}
                edit={modalMode === "editGroup" && editGroup}
                // refreshData={refreshGroupList}
              />
            )}
            {modalMode === "createEmail" && (
              <CreateEmailModal
                setOpen={setModalMode}
                selectedDomain={selectedDomain}
                selectedDomainStats={selectedDomainStats}
                refreshData={handleChange}
                open={true}
              />
            )}
            {modalMode === "createBulkEmail" && (
              <CreateBulkEmailModal
                setOpen={setModalMode}
                selectedDomain={selectedDomain}
                selectedDomainStats={selectedDomainStats}
                refreshData={handleChange}
                open={true}
              />
            )}
          </Fragment>
        )}
        {detailModal && (
          <ViewDetails
            setOpen={setDetailModal}
            open={detailModal}
            selectedDomain={selectedDomain}
          />
        )}
        <div className={classes["domain-table"]}>
          <table>
            <thead>
              {mainPageMode === "mailbox" ? (
                <tr>
                  <th>Email</th>
                  <th>Last Login</th>
                  <th>Space</th>
                  <th> </th>
                  <th> </th>
                  <th> </th>
                  <th> </th>
                </tr>
              ) : mainPageMode === "emailAlias" ? (
                <tr>
                  <th>Alias</th>
                  <th>Forward to</th>
                  <th> </th>
                </tr>
              ) : (
                <tr>
                  <th>Email</th>
                  <th>Category</th>
                  <th> </th>
                  <th> </th>
                </tr>
              )}
            </thead>
            <tbody>
              {mainPageMode === "mailbox" ? (
                selectedDomainStats?.email_list?.length > 0 ? (
                  selectedDomainStats?.email_list?.map((domain) => (
                    <tr key={domain.id}>
                      <td>
                        <span className={classes["table-text"]}>
                          {domain.email}
                        </span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>
                          {domain?.lastauth_timestamp
                            ? domain.lastauth_timestamp
                            : "-"}
                        </span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>
                          {domain.quota / 1000} GB
                        </span>
                      </td>
                      <td className={classes["icon-padding"]}>
                        <span
                          onClick={() => {
                            setMode("editEmail");
                            setEditingEmail({
                              id: domain.id,
                              email: domain.email,
                            });
                          }}
                          className={classes.icons}
                        >
                          <Tooltip title="Edit Mailbox">
                            <EditIcon />
                          </Tooltip>
                        </span>
                      </td>
                      <td className={classes["icon-padding"]}>
                        <span
                          onClick={() => setDetailModal(domain.email)}
                          className={classes.icons}
                        >
                          <Tooltip title="View Details">
                            <VisibilityIcon />
                          </Tooltip>
                        </span>
                      </td>
                      <td className={classes["icon-padding"]}>
                        <span
                          onClick={() => deleteMailboxHandler(domain.email)}
                          className={classes.icons}
                        >
                          <Tooltip title="Delete Mailbox">
                            <DeleteIcon />
                          </Tooltip>
                        </span>
                      </td>

                      <td className={classes["icon-padding"]}>
                        <span
                          onClick={() => loginWebmailHandler(domain.email)}
                          className={classes.icons}
                        >
                          <Tooltip title="Login To Webmail">
                            <PublicIcon />
                          </Tooltip>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <span className={classes["table-text"]}>
                        No Mailboxes Found
                      </span>
                    </td>
                    <td>
                      <span className={classes["table-text"]}>-</span>
                    </td>
                    <td>
                      <span className={classes["table-text"]}>-</span>
                    </td>
                    <td>
                      <span className={classes.icons}>-</span>
                    </td>
                    <td>
                      <span
                        // onClick={() => setDetailModal(domain.email)}
                        className={classes.icons}
                      >
                        -
                      </span>
                    </td>
                    <td>
                      <span className={classes.icons}>-</span>
                    </td>
                  </tr>
                )
              ) : mainPageMode === "emailAlias" ? (
                selectedEmailAlises?.length > 0 ? (
                  selectedEmailAlises?.map((email) => (
                    <tr key={email.id}>
                      <td>
                        <span className={classes["table-text"]}>
                          {email.alias}
                        </span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>
                          {email.forward}
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={() => deleteAliasHandler(email.alias)}
                          className={classes.icons}
                        >
                          <Tooltip title="Delete Email Alias">
                            <DeleteIcon />
                          </Tooltip>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <span className={classes["table-text"]}>
                        No Email Alias Found
                      </span>
                    </td>
                    <td>
                      <span className={classes["table-text"]}>-</span>
                    </td>
                    <td>
                      <span>-</span>
                    </td>
                  </tr>
                )
              ) : (
                <Fragment>
                  {selectedSmartGroupList?.length > 0 ? (
                    selectedSmartGroupList?.map((group) => (
                      <tr key={group.id}>
                        <td>
                          <span className={classes["table-text"]}>
                            {group.name}@{selectedDomain}
                          </span>
                        </td>
                        <td>
                          <span className={classes["table-text"]}>
                            Smart List
                          </span>
                        </td>
                        <td className={classes["icon-padding-max"]}>
                          <span
                            onClick={() => {
                              setMode("viewGroup");
                              setViewGroup({
                                id: group.id,
                                name: group.name,
                                isSmart: true,
                              });
                            }}
                            className={classes.icons}
                          >
                            <Tooltip title="View Group List">
                              <AccessibilityIcon />
                            </Tooltip>
                          </span>
                          <span
                            onClick={() => {
                              setModalMode("editGroup");
                              setEditGroup({ id: group.id, name: group.name });
                            }}
                            className={classes.icons}
                          >
                            <Tooltip title="Edit Group List">
                              <EditIcon />
                            </Tooltip>
                          </span>

                          {/* </td>
                    <td className={classes["icon-padding"]}> */}
                          <span
                            onClick={() => deleteGroupHandler(group.name, true)}
                            className={classes.icons}
                          >
                            <Tooltip title="Delete Group List">
                              <DeleteIcon />
                            </Tooltip>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <span className={classes["table-text"]}>
                          No Smart List Found
                        </span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>-</span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>-</span>
                      </td>
                    </tr>
                  )}

                  {selectedGroupList?.length > 0 ? (
                    selectedGroupList?.map((group) => (
                      <tr key={group}>
                        <td>
                          <span className={classes["table-text"]}>{group}</span>
                        </td>
                        <td>
                          <span className={classes["table-text"]}>
                            Normal List
                          </span>
                        </td>
                        <td className={classes["icon-padding-max"]}>
                          <span
                            onClick={() => {
                              setMode("viewGroup");
                              setViewGroup({ name: group, isSmart: false });
                            }}
                            className={classes.icons}
                          >
                            <Tooltip title="View Group List">
                              <AccessibilityIcon />
                            </Tooltip>
                          </span>

                          {/* </td>
                    <td className={classes["icon-padding"]}> */}
                          <span
                            onClick={() => deleteGroupHandler(group, false)}
                            className={classes.icons}
                          >
                            <Tooltip title="Delete Group List">
                              <DeleteIcon />
                            </Tooltip>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <span className={classes["table-text"]}>
                          No Normal List Found
                        </span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>-</span>
                      </td>
                      <td>
                        <span className={classes["table-text"]}>-</span>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
