import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcrClasses } from "../../../../../actions/acrClass";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import AcrClassModal from "./AcrClassModal";
import AcrClassTable from "./AcrClassTable";

const Designation = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchAcrClasses(userID));
  }, [dispatch]);
  const { acrClass } = useSelector((state) => state.acrClass);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  let userProgramsPermissions;

  if (localStorage.getItem("userProgramsPermissions") !== "undefined") {
    userProgramsPermissions = JSON.parse(
      localStorage.getItem("userProgramsPermissions")
    );
  }

  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="ACRClass" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[9]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new ACRClass
        </CButton>
      </div>
      <AcrClassTable
        acrClass={acrClass}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[9]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[9]?.Delete
        }
      />
      <AcrClassModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new ACRClass"}
      />
    </CCard>
  );
};

export default Designation;
