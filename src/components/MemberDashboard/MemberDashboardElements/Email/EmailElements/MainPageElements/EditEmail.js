import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import classes from "./EditEmail.module.css";

const timeZoneList = [
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

let requestOptions;

const EditEmail = ({
  editingEmail,
  setMode,
  selectedDomain,
  setSelectedDomainStats,
}) => {
  const businessId = localStorage.getItem("businessId");
  const enterpriseId = localStorage.getItem("enterpriseId");
  const auth = useSelector((state) => state.auth);
  const [editEmailData, setEditEmailData] = useState({});
  const [loading, setLoading] = useState(true);

  const setEditEmailDataHandler = (event) => {
    setEditEmailData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const editEmailSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("userID", editingEmail.id);
    formData.append("email", editingEmail.email);
    formData.append("full_name", editEmailData.name);
    formData.append("space", editEmailData.space);
    formData.append("time_zone", editEmailData.timeZone);
    formData.append("date_format", editEmailData.dateFormat);
    if (editEmailData.newPassword)
      formData.append("password", editEmailData.newPassword);
    formData.append("status", editEmailData.status);
    formData.append("localsmtp", editEmailData.smtp ? "1" : "0");
    formData.append(
      "account_type",
      editEmailData.emailPackage === businessId ? "1" : "2"
    );
    requestOptions.method = "POST";
    requestOptions.body = formData;
    if (editEmailData.newPassword === editEmailData.retypePassword) {
      try {
        var response = await fetch(
          `https://api.inspedium.email/mailbox-edit?domain=${selectedDomain}`,
          requestOptions
        );
      } catch {
        toast.error("An unknown error occurred, please try later!");
      }

      const responseData = await response.json();

      if (responseData.success === 1) {
        delete requestOptions.body;
        requestOptions.method = "GET";
        const response = await fetch(
          `https://api.inspedium.email/domain-stats?domain=${selectedDomain}`,
          requestOptions
        );
        const refreshData = await response.json();

        setSelectedDomainStats(refreshData);
        toast.success(responseData.msg);
      } else {
        toast.error(responseData.msg);
      }
    } else {
      toast.error("Passwords do not match!");
    }
    setLoading(false);
    // console.log(editingEmail, selectedDomain);
    // console.log(editEmailData);
    // console.log(responseData);
  };

  useEffect(() => {
    const fetchInfo = async () => {
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
        `https://api.inspedium.email/mailbox-info?domain=${selectedDomain}&email=${editingEmail.email}`,
        requestOptions
      );
      const responseData = await response.json();

      setEditEmailData({
        status: responseData.disabled === "0" ? true : false,
        smtp: responseData.localsmtponly === "0" ? false : true,
        name: responseData.uname,
        space: responseData.quota / 1000,
        timeZone: responseData.timezone,
        dateFormat: responseData.dateformat,
        emailPackage:
          responseData.account_type === "1" ? businessId : enterpriseId,
      });
      setLoading(false);
      // console.log(responseData);
    };

    fetchInfo();
  }, []);

  return (
    <div className={classes["edit-email"]}>
      <h3 className={classes.domain}>
        <EmailIcon
          sx={{
            fontSize: "1em",
          }}
        />
        &nbsp;{loading ? "Please Wait..." : editingEmail.email}
      </h3>
      <form
        onSubmit={editEmailSubmitHandler}
        className={classes["create-modal-form"]}
      >
        <div>
          <div className={classes.switches}>
            <div>
              <label htmlFor="status">Status</label>
              <label class={classes.switch}>
                <input
                  type="checkbox"
                  name="status"
                  disabled={loading}
                  checked={editEmailData.status}
                  onChange={(event) =>
                    setEditEmailData((prevState) => ({
                      ...prevState,
                      status: event.target.checked,
                    }))
                  }
                />
                <span class={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>

            <div>
              <label htmlFor="smtp">Local SMTP</label>
              <label class={classes.switch}>
                <input
                  type="checkbox"
                  name="smtp"
                  disabled={loading}
                  checked={editEmailData.smtp}
                  onChange={(event) =>
                    setEditEmailData((prevState) => ({
                      ...prevState,
                      smtp: event.target.checked,
                    }))
                  }
                />
                <span class={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>
          </div>
          <label htmlFor="name">Name of User</label>
          <TextField
            id="name"
            name="name"
            placeholder="John Smith"
            label=""
            variant="outlined"
            onChange={setEditEmailDataHandler}
            value={editEmailData?.name}
            disabled={loading}
            //   endAdornment={<InputAdornment position="end">@123</InputAdornment>}
          />
          <label htmlFor="space">Space</label>
          <OutlinedInput
            id="space"
            name="space"
            type="number"
            defaultValue={5}
            placeholder="Enter Space"
            label=""
            variant="outlined"
            endAdornment={<InputAdornment position="end">GB</InputAdornment>}
            onChange={setEditEmailDataHandler}
            value={editEmailData?.space}
            disabled={loading}
          />
          <label>Email Package</label>
          <FormControl>
            {/* <InputLabel id="demo-simple-select-label">Select Package</InputLabel> */}
            {/* <Select
              required
              labelId="demo-simple-select-label"
              id="emailPackage"
              name="emailPackage"
              defaultValue="Package# 1"
              onChange={setEditEmailDataHandler}
              value={editEmailData?.emailPackage}
            >
              <MenuItem value="Package# 1">Package# 1</MenuItem>
              <MenuItem value="Package# 2">Package# 2</MenuItem>
            </Select> */}
            <Select
              required
              labelId="demo-simple-select-label"
              id="emailPackage"
              name="emailPackage"
              value={
                editEmailData?.emailPackage
                  ? editEmailData?.emailPackage
                  : enterpriseId
              }
              onChange={setEditEmailDataHandler}
              disabled={loading}
            >
              <MenuItem value={businessId}>Business Email</MenuItem>
              <MenuItem value={enterpriseId}>Enterprise Email</MenuItem>
            </Select>
          </FormControl>
          <label>Time Zone</label>
          <Autocomplete
            disablePortal
            id="timeZone"
            name="timeZone"
            value={
              editEmailData?.timeZone
                ? editEmailData?.timeZone
                : "America/Santarem"
            }
            options={timeZoneList}
            renderInput={(params) => <TextField {...params} label="" />}
            onChange={(event, value) =>
              setEditEmailData((prevState) => ({
                ...prevState,
                timeZone: value,
              }))
            }
            disabled={loading}
            // onChange={(event, value) => setTimeZone(value)}
            // sx={{ width: 300 }}
          />
          {/* <FormControl>
            <Select
              required
              labelId="demo-simple-select-label"
              id="timeZone"
              name="timeZone"
              defaultValue="America/New_York"
              onChange={setEditEmailDataHandler}
              value={editEmailData.timeZone}
              // onChange={setData}
              // value={age}
              // label="Select Package"
              // onChange={handleChange}
            >
              <MenuItem value="America/New_York">America/New_York</MenuItem>
              <MenuItem value="America/New_York">America/New_York</MenuItem>
            </Select>
          </FormControl> */}
          <label>Date Format</label>
          <FormControl>
            {/* <InputLabel id="demo-simple-select-label">Select Package</InputLabel> */}
            <Select
              required
              labelId="demo-simple-select-label"
              id="dateFormat"
              name="dateFormat"
              defaultValue="ddmm/yy"
              onChange={setEditEmailDataHandler}
              value={
                editEmailData?.dateFormat
                  ? editEmailData?.dateFormat
                  : "ddmm/yy"
              }
              disabled={loading}
            >
              <MenuItem value="yyyy-mm-dd">yyyy-mm-dd</MenuItem>
              <MenuItem value="yyyy-dd-mm">yyyy-dd-mm</MenuItem>
              <MenuItem value="yyyy/mm/dd">yyyy/mm/dd</MenuItem>
              <MenuItem value="yyyy/dd/mm">yyyy/dd/mm</MenuItem>
              <MenuItem value="dd-mm-yyyy">dd-mm-yyyy</MenuItem>
              <MenuItem value="mm-dd-yyyy">mm-dd-yyyy</MenuItem>
              <MenuItem value="dd/mm/yyyy">dd/mm/yyyy</MenuItem>
              <MenuItem value="mm/dd/yyyy">mm/dd/yyyy</MenuItem>
            </Select>
          </FormControl>
          <div className={classes["submit-buttons"]}>
            <button disabled={loading} type="submit" className="color-button">
              {loading ? "Please Wait..." : "Save Changes"}
            </button>
            <button
              onClick={() => setMode("mainPage")}
              className="color-inverse-button"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className={classes["input-password"]}>
          <h2>Optional:</h2>
          <label htmlFor="newPassword">New Password</label>
          <TextField
            id="newPassword"
            name="newPassword"
            type="password"
            // placeholder="Enter Email Address"
            label=""
            variant="outlined"
            onChange={setEditEmailDataHandler}
            value={editEmailData?.newPassword}
          />
          <label htmlFor="retypePassword">Re-type Password</label>
          <TextField
            id="retypePassword"
            name="retypePassword"
            type="password"
            // placeholder="Enter Email Address"
            label=""
            variant="outlined"
            onChange={setEditEmailDataHandler}
            value={editEmailData?.retypePassword}
          />
        </div>
      </form>
    </div>
  );
};

export default EditEmail;
