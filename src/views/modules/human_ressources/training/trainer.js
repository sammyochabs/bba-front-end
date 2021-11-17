import { CCardBody, CRow, CCol, CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanTypes } from "src/actions/loantypes";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import {
  fetchEducationlist,
  fetchEmployeeDropdown,
} from "src/actions/HumanRessource/Trainer.services";
import TrainerTable from "./TrainerTable";
import TrainerModal from "./TrainerModal";
import { ExportCSV } from "src/actions/ExportCSV";
const Trainer = () => {
  // const dispatch = useDispatch();
  const [trainerList, setTrainer] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const userID = localStorage.getItem("userID");
  useEffect(async () => {
    setTrainer(await fetchEducationlist(userID));
    setEmployeeList(await fetchEmployeeDropdown(userID));
  }, []);
  //  const { loantypes } = useSelector(state => state.loantype)
  const [modal, setModal] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const toggle = () => {
    setResponseModal(false);
    setModal(!modal);
  };

  const reInitalizeList = async () => {
    setTrainer(await fetchEducationlist(userID));
  };

  let userProgramsPermissions;

  if (localStorage.getItem("userProgramsPermissions") !== "undefined") {
    userProgramsPermissions = JSON.parse(
      localStorage.getItem("userProgramsPermissions")
    );
  }

  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Trainer List" />
        <CRow>
          <CCol sm="12">
            <CButton
              onClick={() => {
                if (
                  userProgramsPermissions &&
                  userProgramsPermissions[21]?.Add === 1
                ) {
                  // history.push("/HR/AddEducation");
                  toggle();
                } else {
                  alert("You dont have this permission");
                }
              }}
              color="info"
            >
              + Add Trainer
            </CButton>
            <ExportCSV
              color="info"
              csvData={trainerList}
              fileName={"Trainer-list"}
              permission={
                userProgramsPermissions && userProgramsPermissions[21]?.Export
              }
            />
          </CCol>
        </CRow>
      </div>

      <TrainerTable
        editPermission={
          userProgramsPermissions && userProgramsPermissions[21]?.Edit
        }
        viewPermission={
          userProgramsPermissions && userProgramsPermissions[21]?.View
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[21]?.Delete
        }
        employeeList={trainerList}
        userID={userID}
        employeedropdown={employeeList}
        reInitalizeList={reInitalizeList}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
      <TrainerModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Trainer"}
        currentValue={userID}
        employeedropdown={employeeList}
        reInitalizeList={reInitalizeList}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
    </CCard>
  );
};

export default Trainer;
