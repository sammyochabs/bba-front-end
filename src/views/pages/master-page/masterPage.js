// import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import BbaLogo from "src/assets/bba-master_logo";
import {
  archiveIcon,
  briefcaseIcon,
  calendarIcon,
  chartIcon,
  dollarIcon,
  lockIcon,
  settingsIcon,
  toolIcon,
  usersIcon,
} from "src/assets/icons/modules";
import { TheHeader } from "src/containers";
import Card from "src/reusable/modules-card/card";
import Calendar from "src/views/plugins/calendar/Calendar";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getUserPermissions } from "src/services/apiCalls";
const MasterPage = () => {
  const [permissions, setPermissions] = useState([]);
  const currentDate = moment().format("MMMM Do YYYY");

  var loggedInUser = localStorage.userName;

  const fetchPermissions = async () => {
    const fetchedPermissions = await getUserPermissions(
      localStorage.getItem("userID"),
      localStorage.getItem("roleid")
    );
    console.log("fetchedPermissions", fetchedPermissions);
    setPermissions(fetchedPermissions);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  console.log(permissions);

  return (
    <div className="master-page-container">
      <TheHeader />
      <div className="master-page">
        <div className="calendar">
          <div className="current-date">
            <h1>My todos</h1>
            <span>{currentDate}</span>
          </div>
          <Calendar />
        </div>
        <div className="modules">
          <div className="row">
            <BbaLogo size={100} />
          </div>
          <div className="mt-3">
            <h1 className="welcome-text">
              Welcome back, <br />
              <span className="username">{loggedInUser}</span>
            </h1>
          </div>
          <div className="modules-wrapper">
            {/* <Card
              icon={settingsIcon}
              module="Settings"
              bgColor="#89abcd"
              path="/dashboard"
              moduleName="Settings"
            />*/}
            <div className="moduleEmptySpace"></div>

            <Card
              icon={lockIcon}
              module="System Admin wing"
              bgColor="#5998c2"
              path="/dashboard"
              moduleName="Administration"
              permission={permissions[1]?.Permission}
            />
            {/* <Card
              icon={usersIcon}
              module="Human Resources"
              bgColor="#3c78a7"
              path="/dashboard"
              moduleName="Human Ressources"
            /> */}
            <div className="moduleEmptySpace"></div>
            <Card
              icon={briefcaseIcon}
              module="Planning and Development wing"
              bgColor="#556eef"
              path="/dashboard"
              moduleName="Planning and Development"
              permission={permissions[2]?.Permission}
            />
            {/* <Card icon={calendarIcon} module="Project Manager" bgColor="#485ed7" path="/dashboard" moduleName="Project Manager" /> */}
            <Card
              icon={toolIcon}
              module="Operation & Maintenance"
              bgColor="#364bb8"
              path="/dashboard"
              moduleName="Operating & Maintenance"
              permission={permissions[3]?.Permission}
            />
            <Card
              icon={dollarIcon}
              module="Finance and Accounts wing"
              bgColor="#8980ff"
              path="/dashboard"
              moduleName="Finance and Accounts wing" //"Finance and Accounts"
              permission={permissions[4]?.Permission}
            />

            {/* <Card
              //href="https://google.com"
              icon={archiveIcon}
              module="Store Management"
              bgColor="#5942bb"
              path="/dashboard"
              moduleName="Store Management"
              //onClick={() => window.open('//' + 'google.com', '_blank')}

              //path="https://www.google.com/"
            ></Card> */}
            <div className="moduleEmptySpace"></div>
            <Card
              icon={chartIcon}
              module="Technical wing"
              bgColor="#6c5ce7"
              path="/dashboard"
              moduleName="Technical"
              permission={permissions[5]?.Permission}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;
