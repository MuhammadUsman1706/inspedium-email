import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import CreateBulkGroupMemberModal from "./CreateBulkGroupMemberModal";
import CreateGroupMemberModal from "./CreateGroupMemberModal";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";

import classes from "../MainPage.module.css";
import "react-confirm-alert/src/react-confirm-alert.css";

let viewGroupListCopy;
let requestOptions;

const ViewGroupList = ({
  viewGroup,
  selectedDomain,
  setMode,
  setMainPageMode,
}) => {
  const [groupList, setGroupList] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [modalMode, setModalMode] = useState(false);
  const auth = useSelector((state) => state.auth);

  const fetchGroupListMembers = async () => {
    const fallBackIdentity =
      viewGroup?.id || viewGroup?.name || localStorage.getItem("viewGroupId");
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", `${auth.id}`);
    requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (viewGroup.isSmart) {
      var response = await fetch(
        `https://api.inspedium.email/smartgrouplistMembers?domain=${selectedDomain}&groupID=${fallBackIdentity}`,
        requestOptions
      );
    } else {
      var response = await fetch(
        `https://api.inspedium.email/grouplistMembers?domain=${selectedDomain}&groupName=${fallBackIdentity}`,
        requestOptions
      );
    }

    localStorage.setItem("viewGroupId", fallBackIdentity);
    const responseData = await response.json();

    if (responseData?.member_list) {
      setGroupList(responseData.member_list);
      viewGroupListCopy = responseData.member_list;
    }
  };

  // const refreshData = (newGroup) => {
  //   setGroupList((prevState) => [...prevState, newGroup]);
  //   viewGroupListCopy.push(newGroup);
  // };

  const deleteGroupMemberHandler = async (groupMemberEmail) => {
    confirmAlert({
      title: "Warning",
      message:
        "Are you sure you want to delete this group member? Please note that this action is irreversible.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const fallBackIdentity =
              viewGroup.id ||
              viewGroup.name ||
              localStorage.getItem("viewGroupId");

            requestOptions.method = "POST";
            if (viewGroup.isSmart)
              var response = await fetch(
                `https://api.inspedium.email/removeSmartListMember?domain=${selectedDomain}&groupID=${fallBackIdentity}&member=${groupMemberEmail}`,
                requestOptions
              );
            else
              var response = await fetch(
                `https://api.inspedium.email/removeListMember?domain=${selectedDomain}&groupName=${fallBackIdentity}&member=${groupMemberEmail}`,
                requestOptions
              );

            const responseData = await response.json();
            if (responseData.success === 1) {
              const filteredGroupList = groupList.filter(
                (group) => group.member !== groupMemberEmail
              );
              setGroupList(filteredGroupList);
              viewGroupListCopy = viewGroupListCopy.filter(
                (group) => group.member !== groupMemberEmail
              );
              toast.success(responseData.msg);
            } else {
              toast.error(responseData.msg);
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
    fetchGroupListMembers();

    return () => {
      setGroupList(null);
      viewGroupListCopy = null;
    };
  }, [selectedDomain]);

  useEffect(() => {
    if (viewGroupListCopy) {
      const filteredGroupList = viewGroupListCopy.filter((group) =>
        group.member.toLowerCase().includes(searchParam.toLowerCase())
      );
      setGroupList(filteredGroupList);
    }
  }, [searchParam]);

  return (
    <div className={classes["main-page"]}>
      <div className={classes["top-bar-group-list"]}>
        <h2>Group List</h2>
        <p>
          <EmailIcon />
          {viewGroup.name}
          {viewGroup.isSmart && `@${selectedDomain}`}
        </p>
      </div>

      <div className={classes["bottom-bar"]}>
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
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              onChange={(event) => setSearchParam(event.target.value)}
              disabled={false} // FOR NOW
              inputProps={{ "aria-label": "search email" }}
            />
          </Paper>
          <div>
            <button
              onClick={() => setModalMode("bulkGroupMember")}
              className="color-button"
            >
              Add Bulk
            </button>
            <button
              onClick={() => setModalMode("groupMember")}
              className="color-button"
            >
              Add
            </button>
          </div>
        </div>
        <CreateGroupMemberModal
          open={modalMode === "groupMember"}
          setOpen={setModalMode}
          selectedDomain={selectedDomain}
          viewGroup={viewGroup}
          refreshData={fetchGroupListMembers}
        />
        <CreateBulkGroupMemberModal
          open={modalMode === "bulkGroupMember"}
          setOpen={setModalMode}
          selectedDomain={selectedDomain}
          viewGroup={viewGroup}
          refreshData={fetchGroupListMembers}
        />

        <div className={classes["domain-table"]}>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                {viewGroup.isSmart && (
                  <Fragment>
                    <th>Can Post</th>
                    <th>Can Receive</th>
                  </Fragment>
                )}
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {groupList ? (
                groupList?.length > 0 ? (
                  groupList?.map((group) => (
                    <tr key={group.member}>
                      <td>
                        <span className={classes["table-text"]}>
                          {group.member}
                        </span>
                      </td>
                      {viewGroup.isSmart && (
                        <Fragment>
                          <td>
                            <span className={classes["table-text"]}>
                              {+group.can_post ? "Yes" : "No"}
                            </span>
                          </td>
                          <td>
                            <span className={classes["table-text"]}>
                              {+group.will_receive ? "Yes" : "No"}
                            </span>
                          </td>
                        </Fragment>
                      )}
                      <td>
                        <span
                          onClick={() => deleteGroupMemberHandler(group.member)}
                          className={classes.icons}
                        >
                          <Tooltip title="Delete">
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
                        No Group List Found
                      </span>
                    </td>
                    <td>
                      <span className={classes["table-text"]}>-</span>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td>
                    <span className={classes["table-text"]}>
                      Please Wait...
                    </span>
                  </td>
                  <td>
                    <span className={classes["table-text"]}>-</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          style={{
            width: "max-content",
            marginTop: "1rem",
          }}
          className="color-button"
          onClick={() => {
            setMainPageMode("groupList");
            setMode("mainPage");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewGroupList;
