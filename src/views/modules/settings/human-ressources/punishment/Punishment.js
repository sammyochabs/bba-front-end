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
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Punishments" />
        <CButton onClick={toggle} color="info">
          + Add new Punishment
        </CButton>
      </div>
      <PunishmentTable punishments={punishments} userID={userID} />
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
