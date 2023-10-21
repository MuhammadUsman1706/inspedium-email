import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { toast } from "react-toastify";
import { Autocomplete, TextField, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/InfoOutlined";

import classes from "./DomainSetting.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

let requestOptions;
let dkimSettingStatusCheck = 0;
let dkimSettingTimeout;
let timeZoneList = [
  "Europe/Andorra",
  "Asia/Dubai",
  "Asia/Kabul",
  "Europe/Tirane",
  "Asia/Yerevan",
  "Antarctica/Casey",
  "Antarctica/Davis",
  "Antarctica/DumontDUrville", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
  "Antarctica/Mawson",
  "Antarctica/Palmer",
  "Antarctica/Rothera",
  "Antarctica/Syowa",
  "Antarctica/Troll",
  "Antarctica/Vostok",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Salta",
  "America/Argentina/Jujuy",
  "America/Argentina/Tucuman",
  "America/Argentina/Catamarca",
  "America/Argentina/La_Rioja",
  "America/Argentina/San_Juan",
  "America/Argentina/Mendoza",
  "America/Argentina/San_Luis",
  "America/Argentina/Rio_Gallegos",
  "America/Argentina/Ushuaia",
  "Pacific/Pago_Pago",
  "Europe/Vienna",
  "Australia/Lord_Howe",
  "Antarctica/Macquarie",
  "Australia/Hobart",
  "Australia/Currie",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Broken_Hill",
  "Australia/Brisbane",
  "Australia/Lindeman",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Perth",
  "Australia/Eucla",
  "Asia/Baku",
  "America/Barbados",
  "Asia/Dhaka",
  "Europe/Brussels",
  "Europe/Sofia",
  "Atlantic/Bermuda",
  "Asia/Brunei",
  "America/La_Paz",
  "America/Noronha",
  "America/Belem",
  "America/Fortaleza",
  "America/Recife",
  "America/Araguaina",
  "America/Maceio",
  "America/Bahia",
  "America/Sao_Paulo",
  "America/Campo_Grande",
  "America/Cuiaba",
  "America/Santarem",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Manaus",
  "America/Eirunepe",
  "America/Rio_Branco",
  "America/Nassau",
  "Asia/Thimphu",
  "Europe/Minsk",
  "America/Belize",
  "America/St_Johns",
  "America/Halifax",
  "America/Glace_Bay",
  "America/Moncton",
  "America/Goose_Bay",
  "America/Blanc-Sablon",
  "America/Toronto",
  "America/Nipigon",
  "America/Thunder_Bay",
  "America/Iqaluit",
  "America/Pangnirtung",
  "America/Atikokan",
  "America/Winnipeg",
  "America/Rainy_River",
  "America/Resolute",
  "America/Rankin_Inlet",
  "America/Regina",
  "America/Swift_Current",
  "America/Edmonton",
  "America/Cambridge_Bay",
  "America/Yellowknife",
  "America/Inuvik",
  "America/Creston",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Dawson",
  "Indian/Cocos",
  "Europe/Zurich",
  "Africa/Abidjan",
  "Pacific/Rarotonga",
  "America/Santiago",
  "America/Punta_Arenas",
  "Pacific/Easter",
  "Asia/Shanghai",
  "Asia/Urumqi",
  "America/Bogota",
  "America/Costa_Rica",
  "America/Havana",
  "Atlantic/Cape_Verde",
  "America/Curacao",
  "Indian/Christmas",
  "Asia/Nicosia",
  "Asia/Famagusta",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "America/Santo_Domingo",
  "Africa/Algiers",
  "America/Guayaquil",
  "Pacific/Galapagos",
  "Europe/Tallinn",
  "Africa/Cairo",
  "Africa/El_Aaiun",
  "Europe/Madrid",
  "Africa/Ceuta",
  "Atlantic/Canary",
  "Europe/Helsinki",
  "Pacific/Fiji",
  "Atlantic/Stanley",
  "Pacific/Chuuk",
  "Pacific/Pohnpei",
  "Pacific/Kosrae",
  "Atlantic/Faroe",
  "Europe/Paris",
  "Europe/London",
  "Asia/Tbilisi",
  "America/Cayenne",
  "Africa/Accra",
  "Europe/Gibraltar",
  "America/Godthab",
  "America/Danmarkshavn",
  "America/Scoresbysund",
  "America/Thule",
  "Europe/Athens",
  "Atlantic/South_Georgia",
  "America/Guatemala",
  "Pacific/Guam",
  "Africa/Bissau",
  "America/Guyana",
  "Asia/Hong_Kong",
  "America/Tegucigalpa",
  "America/Port-au-Prince",
  "Europe/Budapest",
  "Asia/Jakarta",
  "Asia/Pontianak",
  "Asia/Makassar",
  "Asia/Jayapura",
  "Europe/Dublin",
  "Asia/Jerusalem",
  "Asia/Kolkata",
  "Indian/Chagos",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Atlantic/Reykjavik",
  "Europe/Rome",
  "America/Jamaica",
  "Asia/Amman",
  "Asia/Tokyo",
  "Africa/Nairobi",
  "Asia/Bishkek",
  "Pacific/Tarawa",
  "Pacific/Enderbury",
  "Pacific/Kiritimati",
  "Asia/Pyongyang",
  "Asia/Seoul",
  "Asia/Almaty",
  "Asia/Qyzylorda",
  "Asia/Qostanay", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
  "Asia/Aqtobe",
  "Asia/Aqtau",
  "Asia/Atyrau",
  "Asia/Oral",
  "Asia/Beirut",
  "Asia/Colombo",
  "Africa/Monrovia",
  "Europe/Vilnius",
  "Europe/Luxembourg",
  "Europe/Riga",
  "Africa/Tripoli",
  "Africa/Casablanca",
  "Europe/Monaco",
  "Europe/Chisinau",
  "Pacific/Majuro",
  "Pacific/Kwajalein",
  "Asia/Yangon",
  "Asia/Ulaanbaatar",
  "Asia/Hovd",
  "Asia/Choibalsan",
  "Asia/Macau",
  "America/Martinique",
  "Europe/Malta",
  "Indian/Mauritius",
  "Indian/Maldives",
  "America/Mexico_City",
  "America/Cancun",
  "America/Merida",
  "America/Monterrey",
  "America/Matamoros",
  "America/Mazatlan",
  "America/Chihuahua",
  "America/Ojinaga",
  "America/Hermosillo",
  "America/Tijuana",
  "America/Bahia_Banderas",
  "Asia/Kuala_Lumpur",
  "Asia/Kuching",
  "Africa/Maputo",
  "Africa/Windhoek",
  "Pacific/Noumea",
  "Pacific/Norfolk",
  "Africa/Lagos",
  "America/Managua",
  "Europe/Amsterdam",
  "Europe/Oslo",
  "Asia/Kathmandu",
  "Pacific/Nauru",
  "Pacific/Niue",
  "Pacific/Auckland",
  "Pacific/Chatham",
  "America/Panama",
  "America/Lima",
  "Pacific/Tahiti",
  "Pacific/Marquesas",
  "Pacific/Gambier",
  "Pacific/Port_Moresby",
  "Pacific/Bougainville",
  "Asia/Manila",
  "Asia/Karachi",
  "Europe/Warsaw",
  "America/Miquelon",
  "Pacific/Pitcairn",
  "America/Puerto_Rico",
  "Asia/Gaza",
  "Asia/Hebron",
  "Europe/Lisbon",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Pacific/Palau",
  "America/Asuncion",
  "Asia/Qatar",
  "Indian/Reunion",
  "Europe/Bucharest",
  "Europe/Belgrade",
  "Europe/Kaliningrad",
  "Europe/Moscow",
  "Europe/Simferopol",
  "Europe/Kirov",
  "Europe/Astrakhan",
  "Europe/Volgograd",
  "Europe/Saratov",
  "Europe/Ulyanovsk",
  "Europe/Samara",
  "Asia/Yekaterinburg",
  "Asia/Omsk",
  "Asia/Novosibirsk",
  "Asia/Barnaul",
  "Asia/Tomsk",
  "Asia/Novokuznetsk",
  "Asia/Krasnoyarsk",
  "Asia/Irkutsk",
  "Asia/Chita",
  "Asia/Yakutsk",
  "Asia/Khandyga",
  "Asia/Vladivostok",
  "Asia/Ust-Nera",
  "Asia/Magadan",
  "Asia/Sakhalin",
  "Asia/Srednekolymsk",
  "Asia/Kamchatka",
  "Asia/Anadyr",
  "Asia/Riyadh",
  "Pacific/Guadalcanal",
  "Indian/Mahe",
  "Africa/Khartoum",
  "Europe/Stockholm",
  "Asia/Singapore",
  "America/Paramaribo",
  "Africa/Juba",
  "Africa/Sao_Tome",
  "America/El_Salvador",
  "Asia/Damascus",
  "America/Grand_Turk",
  "Africa/Ndjamena",
  "Indian/Kerguelen",
  "Asia/Bangkok",
  "Asia/Dushanbe",
  "Pacific/Fakaofo",
  "Asia/Dili",
  "Asia/Ashgabat",
  "Africa/Tunis",
  "Pacific/Tongatapu",
  "Europe/Istanbul",
  "America/Port_of_Spain",
  "Pacific/Funafuti",
  "Asia/Taipei",
  "Europe/Kiev",
  "Europe/Uzhgorod",
  "Europe/Zaporozhye",
  "Pacific/Wake",
  "America/New_York",
  "America/Detroit",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Indiana/Indianapolis",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Chicago",
  "America/Indiana/Tell_City",
  "America/Indiana/Knox",
  "America/Menominee",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/North_Dakota/Beulah",
  "America/Denver",
  "America/Boise",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Juneau",
  "America/Sitka",
  "America/Metlakatla",
  "America/Yakutat",
  "America/Nome",
  "America/Adak",
  "Pacific/Honolulu",
  "America/Montevideo",
  "Asia/Samarkand",
  "Asia/Tashkent",
  "America/Caracas",
  "Asia/Ho_Chi_Minh",
  "Pacific/Efate",
  "Pacific/Wallis",
  "Pacific/Apia",
  "Africa/Johannesburg",
];

const DomainSetting = ({
  domainId,
  domainStatus,
  setDashboardMenu,
  setDomainId,
}) => {
  const auth = useSelector((state) => state.auth);

  // Data Inputs
  const [domainAliasData, setDomainAliasData] = useState(null);
  const [dkimSettingData, setDkimSettingData] = useState(null);
  const [editorStateContent, setEditorStateContent] = useState();
  const [generalSettingData, setGeneralSettingData] = useState(null);

  // Normal Inputs
  const [addAlias, setAddAlias] = useState(null);

  // Loading Inputs
  const [loading, setLoading] = useState({
    alias: false,
    footer: false,
    general: false,
  });

  const onEditorStateChange = (editorState) => {
    setEditorStateContent(editorState);
  };

  const onEditorStateSaveHandler = async () => {
    setLoading((prevState) => ({ ...prevState, footer: true }));

    const htmlCovertedContent = draftToHtml(
      convertToRaw(editorStateContent.getCurrentContent())
    );

    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", `${auth.id}`);

    const formData = new FormData();
    formData.append("footertxt", htmlCovertedContent);

    requestOptions.method = "POST";
    requestOptions.headers = myHeaders;
    requestOptions.body = formData;

    const response = await fetch(
      `https://api.inspedium.email/domain-SetFooter?domain=${domainId}`,
      requestOptions
    );

    delete requestOptions.body;

    const responseData = await response.json();

    if (responseData.Setfooter.success === 1) {
      toast.success("Footer successfully updated!");
    } else {
      toast.error(
        responseData.Setfooter.msg || "Some error occurred, please try later!"
      );
    }
    setLoading((prevState) => ({ ...prevState, footer: false }));
  };

  const saveAliasFormHandler = async (event) => {
    event.preventDefault();
    if (addAlias) {
      setLoading((prevState) => ({ ...prevState, alias: true }));
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      myHeaders.append("uuid", `${auth.id}`);
      requestOptions.headers = myHeaders;
      requestOptions.method = "POST";

      const response = await fetch(
        `https://api.inspedium.email/domain-alias-add?domain=${domainId}&domainalias=${addAlias}`,
        requestOptions
      );
      const responseData = await response.json();
      if (responseData[domainId].success === 1) {
        toast.success(responseData[domainId].msg);
        setDomainAliasData((prevState) => [...prevState, addAlias]);
      } else {
        toast.error(responseData[domainId].msg);
      }
      setLoading((prevState) => ({ ...prevState, alias: false }));
    }
  };

  const deleteAliasHandler = async (id) => {
    setLoading((prevState) => ({ ...prevState, alias: true }));
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", `${auth.id}`);
    requestOptions.method = "POST";
    requestOptions.headers = myHeaders;

    const response = await fetch(
      `https://api.inspedium.email/domain-alias-rm?domain=${domainId}&domainalias=${id}`,
      requestOptions
    );
    const responseData = await response.json();
    if (responseData[domainId].success === 1) {
      toast.success(responseData[domainId].msg);
      const filteredData = domainAliasData.filter((alias) => alias !== id);
      setDomainAliasData(filteredData);
    } else {
      toast.error(responseData[domainId].msg);
    }
    setLoading((prevState) => ({ ...prevState, alias: false }));
  };

  const changeDkimStatusHandler = (event) => {
    requestOptions.method = "POST";
    const changeStatus = async () => {
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      myHeaders.append("uuid", `${auth.id}`);
      requestOptions.headers = myHeaders;
      const response = await fetch(
        `https://api.inspedium.email/domain-dkim-status?domain=${domainId}&status=${event.target.checked}`,
        requestOptions
      );
      const responseData = await response.json();
      // console.log(responseData);
      // if (responseData.dkim_status.status) {
      setDkimSettingData(responseData.dkim_status);
      toast.success(responseData.dkim_status.msg);
      // } else {
      //   toast.error(responseData.dkim_status.msg);
      // }
    };
    if (dkimSettingStatusCheck === 0) {
      changeStatus();
      dkimSettingTimeout = setTimeout(null, 3000);
    } else {
      clearTimeout(dkimSettingTimeout);
      dkimSettingTimeout = setTimeout(changeStatus, 3000);
    }
    dkimSettingStatusCheck++;
  };

  const domainSettingSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading((prevState) => ({ ...prevState, general: true }));

    requestOptions.method = "POST";
    const formData = new FormData();

    formData.append("domainstatus", domainStatus);
    formData.append("timezone", generalSettingData.timezone);
    formData.append("catchall", generalSettingData.catchall);

    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", `${auth.id}`);
    requestOptions.body = formData;
    requestOptions.headers = myHeaders;

    const response = await fetch(
      `https://api.inspedium.email/domain-setting?domain=${domainId}`,
      requestOptions
    );

    delete requestOptions.body;

    const responseData = await response.json();
    toast.info(responseData.info.msg);
    setLoading((prevState) => ({ ...prevState, general: false }));
  };

  useEffect(() => {
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

    // Get Alias
    fetch(
      `https://api.inspedium.email/domain-alias?domain=${domainId}`,
      requestOptions
    ).then((response) =>
      response
        .json()
        .then((responseData) => setDomainAliasData(responseData.alias_list))
    );

    // Get DKIM
    fetch(
      `https://api.inspedium.email/domain-dkim?domain=${domainId}`,
      requestOptions
    ).then((response) =>
      response
        .json()
        .then((responseData) => setDkimSettingData(responseData.dkim))
    );

    // Get Footer
    fetch(
      `https://api.inspedium.email/domain-footer?domain=${domainId}`,
      requestOptions
    ).then((response) =>
      response.json().then((responseData) => {
        const contentBlock = htmlToDraft(responseData.footer.footer);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorStateContent(editorState);
      })
    );

    // Get Setting
    fetch(
      `https://api.inspedium.email/domain-info?domain=${domainId}`,
      requestOptions
    ).then((response) =>
      response
        .json()
        .then((responseData) => setGeneralSettingData(responseData.info))
    );
  }, []);

  return (
    <div className={classes["domain-setting"]}>
      <div className={classes["domain-setting-cards"]}>
        <div className={classes["card-parent"]}>
          <h3 className={classes.heading}>
            Domain Alias
            <Tooltip
              placement="top"
              title={
                <Typography>
                  You can receive the e-mails destined for several domains at
                  one unique Inbox through our Domain Aliasing feature.
                </Typography>
              }
            >
              <span>
                <InfoIcon fontSize="inherit" />
              </span>
            </Tooltip>
          </h3>
          <div className={classes["setting-card"]}>
            <div>
              <label htmlFor="add-alias">Add Alias</label>
              <form
                onSubmit={saveAliasFormHandler}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  columnGap: "10px",
                }}
              >
                <TextField
                  InputLabelProps={false}
                  placeholder="Domain Alias"
                  id="add-alias"
                  label=""
                  variant="outlined"
                  onChange={(event) => setAddAlias(event.target.value)}
                />
                <button
                  disabled={loading.alias}
                  type="submit"
                  className={classes["color-button"]}
                >
                  {loading.alias ? "Please Wait..." : "Save"}
                </button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th>Domain Name</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {domainAliasData?.length > 0 ? (
                    domainAliasData.map((alias) => (
                      <tr>
                        <td>{alias}</td>
                        <td style={{ cursor: "pointer" }}>
                          <Tooltip title="Delete Alias">
                            <DeleteIcon
                              onClick={() => {
                                deleteAliasHandler(alias);
                              }}
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Alias Detected</td>
                      <td>-</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={classes["card-parent"]}>
          <h3 className={classes.heading}>
            DKIM Setting
            <Tooltip
              placement="top"
              title={
                <Typography>
                  DKIM is an email authentication method that uses a digital
                  signature to let the receiver of an email know that the
                  message was sent and authorized by the owner of a domain.
                </Typography>
              }
            >
              <span>
                <InfoIcon fontSize="inherit" />
              </span>
            </Tooltip>
          </h3>
          <div className={classes["setting-card"]}>
            {dkimSettingData ? (
              <Fragment>
                <div
                  style={{
                    display: "flex",
                    columnGap: "1rem",
                  }}
                >
                  <span className={classes["span-header"]}>Status: </span>
                  <label class={classes.switch}>
                    <input
                      type="checkbox"
                      defaultChecked={
                        dkimSettingData.status === "0" ? false : true
                      }
                      onChange={changeDkimStatusHandler}
                    />
                    <span class={`${classes.slider} ${classes.round}`}></span>
                  </label>
                </div>
                <span className={classes["span-header"]}>Host: </span>
                <span>{dkimSettingData.host ? dkimSettingData.host : "-"}</span>
                <br />
                <span className={classes["span-header"]}>Key: </span>
                <span
                  style={{
                    wordBreak: "break-all",
                  }}
                >
                  {dkimSettingData.key ? dkimSettingData.key : "-"}
                </span>
              </Fragment>
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
        </div>
        <div className={classes["card-parent"]}>
          <h3 className={classes.heading}>
            Footer Setting
            <Tooltip
              placement="top"
              title={
                <Typography>
                  The message you enter below will be appended to all messages
                  sent by all users.
                </Typography>
              }
            >
              <span>
                <InfoIcon fontSize="inherit" />
              </span>
            </Tooltip>
          </h3>
          <div className={classes["setting-card"]}>
            <Editor
              editorState={editorStateContent}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
            <button
              disabled={loading.footer}
              onClick={onEditorStateSaveHandler}
              className={classes["color-button"]}
            >
              {loading.footer ? "Please Wait..." : "Save"}
            </button>
          </div>
        </div>
        <div className={classes["card-parent"]}>
          <h3>General Setting</h3>

          <form
            onSubmit={domainSettingSubmitHandler}
            className={classes["setting-card"]}
          >
            {generalSettingData ? (
              <Fragment>
                <label htmlFor="timeZone">Time Zone</label>
                <Autocomplete
                  disablePortal
                  id="timeZone"
                  defaultValue={generalSettingData?.timezone}
                  options={timeZoneList}
                  renderInput={(params) => <TextField {...params} label="" />}
                  onChange={(event, value) =>
                    setGeneralSettingData((prevState) => ({
                      ...prevState,
                      timezone: value,
                    }))
                  }
                  // onChange={(event, value) => setTimeZone(value)}
                  // sx={{ width: 300 }}
                />
                {/* <TextField
              id="timeZone"
              placeholder="America/New_York"
              label=""
              type="select"
              variant="outlined"
            /> */}
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    columnGap: "10px",
                  }}
                >
                  <label htmlFor="catchAll">Catch All</label>
                  <label class={classes.switch}>
                    <input
                      type="checkbox"
                      defaultChecked={generalSettingData?.catchall}
                      onChange={(event) =>
                        setGeneralSettingData((prevState) => ({
                          ...prevState,
                          catchall: event.target.checked,
                        }))
                      }
                      // onChange={(event) => setCatchAll(event.target.checked)}
                    />
                    <span class={`${classes.slider} ${classes.round}`}></span>
                  </label>
                </div>
                <button
                  disabled={loading.general}
                  style={{
                    marginTop: "2rem",
                  }}
                  className={classes["color-button"]}
                  type="submit"
                >
                  {loading.general ? "Please Wait..." : "Save"}
                </button>
              </Fragment>
            ) : (
              <h3>Loading...</h3>
            )}
          </form>
        </div>
      </div>
      <div className={classes["domain-table"]}>
        <h3>General Setting</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Value</th>
              <th>TTL</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MX</td>
              <td>@</td>
              <td>mx.emailarray.com</td>
              <td>1440</td>
              <td>5</td>
            </tr>
            <tr>
              <td>MX</td>
              <td>@</td>
              <td>mx2.emailarray.com</td>
              <td>1440</td>
              <td>10</td>
            </tr>
            <tr>
              <td>TXT</td>
              <td>@</td>
              <td>v=spf1 include:emailarray.com -all</td>
              <td>1440</td>
            </tr>
            <tr>
              <td>CNAME</td>
              <td>webmail</td>
              <td>webredirect.emailarray.com</td>
              <td>1440</td>
            </tr>
            <tr>
              <td>CNAME</td>
              <td>imap</td>
              <td>imap.emailarray.com</td>
              <td>1440</td>
            </tr>
            <tr>
              <td>CNAME</td>
              <td>smtp</td>
              <td>smtp.emailarray.com</td>
              <td>1440</td>
            </tr>
            <tr>
              <td>TXT</td>
              <td>DKIM_HOST</td>
              <td>DKIM_KEY</td>
              <td>1440</td>
            </tr>
            <tr>
              <td>A</td>
              <td>autodiscover</td>
              <td>62.28.212.195</td>
              <td>1440</td>
            </tr>
            <tr>
              <td>A</td>
              <td>autoconfig</td>
              <td>62.28.212.195</td>
              <td>1440</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => {
            setDashboardMenu("Domain");
            setDomainId(null);
          }}
          style={{ marginTop: "1rem" }}
          className="color-button"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DomainSetting;
