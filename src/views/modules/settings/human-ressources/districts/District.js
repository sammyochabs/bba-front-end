import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistricts } from "../../../../../actions/district";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import DistrictModal from "./DistrictModal";
import DistrictTable from "./DistrictTable";

const District = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchDistricts(userID));
  }, [dispatch]);
  const { districts } = useSelector((state) => state.districts);
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
        <SettingPageTitle title="District" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[5]?.Add === 1
            ) {
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new District
        </CButton>
      </div>
      <DistrictTable
        districts={districts}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[5]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[5]?.Delete
        }
      />
      <DistrictModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new District"}
      />
    </CCard>
  );
};

export default District;
