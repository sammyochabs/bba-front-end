import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmpDropdown,
  fetchLeave,
  fetchLeaveType,
} from "src/actions/HumanRessource/empleave";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import EmpLeaveModal from "./EmpLeaveModal";
import EmpLeaveTable from "./EmpLeaveTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const EmpLeave = () => {
  const dispatch = useDispatch();
  const [programs, setPrograms] = useState({});

  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLeave(userID));
    dispatch(fetchEmpDropdown(userID));
    dispatch(fetchLeaveType(userID));
  }, [dispatch]);

  const { empleave } = useSelector((state) => state.empleave);
  const { emplist } = useSelector((state) => state.emplist);

  const { leavelist } = useSelector((state) => state.leavelist);
  console.log(leavelist, "leavelist555");

  const [modal, setModal] = useState(false);
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);

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
        <SettingPageTitle title="Employee Leave Request" />
        <CButton
          onClick={() => {
            if (programs && programs.leaveManagement.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new Employee Leave Request
        </CButton>
      </div>
      <EmpLeaveTable
        editPermission={programs && programs.leaveManagement.Edit}
        viewPermission={programs && programs.leaveManagement.View}
        deletePermission={programs && programs.leaveManagement.Delete}
        approvePermission={programs && programs.leaveManagement.Permission}
        declinePermission={programs && programs.leaveManagement.Permission}
        leavesData={empleave}
        userID={userID}
        emplist={emplist}
        leavelist={leavelist}
      />
      <EmpLeaveModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Leave Request"}
        emplist={emplist}
        leavelist={leavelist}
      />
    </CCard>
  );
};

export default EmpLeave;
