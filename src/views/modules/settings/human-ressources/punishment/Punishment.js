import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPunishments } from "src/actions/punishment";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import PunishmentModal from "./PunishmentModal";
import PunishmentTable from "./PunishmentTable";

const Punishment = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchPunishments(userID));
  }, [dispatch]);
  const { punishments } = useSelector((state) => state.punishments);
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
        <SettingPageTitle title="Punishments" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[8]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new Punishment
        </CButton>
      </div>
      <PunishmentTable
        punishments={punishments}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[1]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[1]?.Delete
        }
      />
      <PunishmentModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Punishments"}
      />
    </CCard>
  );
};

export default Punishment;
