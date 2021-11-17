import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../../../../../actions/grades";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import GradesModal from "./GradesModal";
import GradesTable from "./GradesTable";

const Grades = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchGrades(userID));
  }, [dispatch]);
  const { grades } = useSelector((state) => state.grades);
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
        <SettingPageTitle title="Grades / Pay scales" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[2]?.Add === 1
            ) {
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new grade
        </CButton>
      </div>
      <GradesTable
        grades={grades}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[2]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[2]?.Delete
        }
      />
      <GradesModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new grade"}
      />
    </CCard>
  );
};

export default Grades;
