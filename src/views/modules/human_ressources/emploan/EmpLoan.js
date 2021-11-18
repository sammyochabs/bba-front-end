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
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

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
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);
  const [programs, setPrograms] = useState({});

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getUserProgramsPermisions(
      localStorage.getItem("userID"),
      localStorage.getItem("roleid")
    ).then((res) => {
      setUserProgramsPermissions(res);
    });
  }, []);

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res);
      setPrograms(res.programs);
    });
  }, [mainNavigation]);
  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Employee Loan Request" />
        <CButton
          onClick={() => {
            if (programs && programs.loanManagement.Add === 1) {
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
        editPermission={programs && programs.loanManagement.Edit}
        viewPermission={programs && programs.loanManagement.View}
        deletePermission={programs && programs.loanManagement.Delete}
        approvePermission={programs && programs.loanManagement.Permission}
        declinePermission={programs && programs.loanManagement.Permission}
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
