import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanFunds } from "src/actions/loanfunds";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import LoanfundsModal from "./LoanfundsModal";
import LoanfundsTable from "./LoanfundsTable";

const LoanFunds = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLoanFunds(userID));
  }, [dispatch]);
  const { loanfunds } = useSelector((state) => state.loanfunds);
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
        <SettingPageTitle title="Loan Funds" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[4]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new loan funds
        </CButton>
      </div>
      <LoanfundsTable
        loanfunds={loanfunds}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[4]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[4]?.Delete
        }
      />
      <LoanfundsModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new loan funds"}
      />
    </CCard>
  );
};

export default LoanFunds;
