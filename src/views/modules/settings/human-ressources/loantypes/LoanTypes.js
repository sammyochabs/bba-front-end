import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanTypes } from "src/actions/loantypes";
import LoanTypeModal from "src/views/modules/settings/human-ressources/loantypes/LoanTypeModal";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import LoanTypesTable from "./LoanTypesTable";

const Loantypes = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLoanTypes(userID));
  }, [dispatch]);
  const { loantypes } = useSelector((state) => state.loantype);
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
        <SettingPageTitle title="Loan types" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[1]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new loan type
        </CButton>
      </div>
      <LoanTypesTable
        loantypes={loantypes}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[1]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[1]?.Delete
        }
      />
      <LoanTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new loan type"}
      />
    </CCard>
  );
};

export default Loantypes;
