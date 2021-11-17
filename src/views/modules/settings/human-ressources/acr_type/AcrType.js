import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcrType } from "../../../../../actions/acrtype";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import AcrTypeModal from "./AcrTypeModal";
import AcrTypeTable from "./AcrTypeTable";

const AcrType = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchAcrType(userID));
  }, [dispatch]);
  const { acrType } = useSelector((state) => state.acrType);
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
        <SettingPageTitle title="ACRType" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[10]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new ACRType
        </CButton>
      </div>
      <AcrTypeTable
        acrType={acrType}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[10]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[10]?.Delete
        }
      />
      <AcrTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new ACRType"}
      />
    </CCard>
  );
};

export default AcrType;
