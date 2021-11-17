import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpLoans } from "src/actions/HumanRessource/emploan";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import EmpLoanModal from "./EmpLoanModal";
import EmpLoanTable from "./EmpLoanTable";
import { fetchEmpDropdown } from "src/actions/HumanRessource/empleave";
import { fetchLoanTypes } from "src/actions/loantypes";
import { fetchLoanFunds } from "src/actions/loanfunds";
const EmpLoan = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  // const loans = 0;
  useEffect(() => {
    dispatch(fetchEmpLoans(userID));
    dispatch(fetchEmpDropdown(userID));
    dispatch(fetchLoanTypes(userID));
    dispatch(fetchLoanFunds(userID));
  }, [dispatch]);
  const { empLoan } = useSelector((state) => {
    //  console.log(state);
    return state.empLoan;
  });
  const { emplist } = useSelector((state) => state.emplist);
  const { loantypes } = useSelector((state) => state.loantype);
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
        <SettingPageTitle title="Employee Loan Request" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[22]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new Employee Loan Request
        </CButton>
      </div>
      <EmpLoanTable
        editPermission={
          userProgramsPermissions && userProgramsPermissions[22]?.Edit
        }
        viewPermission={
          userProgramsPermissions && userProgramsPermissions[22]?.View
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[22]?.Delete
        }
        approvePermission={
          userProgramsPermissions && userProgramsPermissions[22]?.Permission
        }
        declinePermission={
          userProgramsPermissions && userProgramsPermissions[22]?.Permission
        }
        empLoan={empLoan}
        userID={userID}
        emplist={emplist}
        loantypes={loantypes}
        loanfunds={loanfunds}
      />
      <EmpLoanModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Loan Request"}
        emplist={emplist}
        loantypes={loantypes}
        loanfunds={loanfunds}
      />
    </CCard>
  );
};

export default EmpLoan;
