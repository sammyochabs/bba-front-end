import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "src/actions/leaves";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import LeavesModal from "./LeavesModal";
import LeavesTable from "./LeavesTable";

const Leaves = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLeaves(userID));
  }, [dispatch]);
  const { leaves } = useSelector((state) => state.leaves);
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
        <SettingPageTitle title="Leaves & duration" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[3]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new leave
        </CButton>
      </div>
      <LeavesTable
        leaves={leaves}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[3]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[3]?.Delete
        }
      />
      <LeavesModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new leaves"}
      />
    </CCard>
  );
};

export default Leaves;
