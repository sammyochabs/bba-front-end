import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHealthRecords } from "src/actions/HumanRessource/healthrecords";
import HealthEditModal from "src/views/modules/human_ressources/healthmanagement/HealthEditModal";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import HealthRecordTable from "./HealthRecordTable";
import { getEmployeeList } from "src/actions/HumanRessource/employees";
import { getHealthInfoList } from "src/actions/HumanRessource/healthInfo";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";

const HealthManagement = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchHealthRecords(userID));
  }, [dispatch]);
  const { healthRecords } = useSelector((state) => state.healthRecords);
  const [modal, setModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [data, setData] = useState("");
  const [healthInfoList, setHealthInfoList] = useState([]);
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);

  const toggle = () => {
    setModal(!modal);
    getEmployeeList((employeeListResult) => {
      setEmployeeList(employeeListResult);
    });
    getHealthInfoList((healthInfoListResult) => {
      setHealthInfoList(healthInfoListResult);
    });
  };

  useEffect(() => {
    getUserProgramsPermisions(
      localStorage.getItem("userID"),
      localStorage.getItem("roleid")
    ).then((res) => {
      setUserProgramsPermissions(res);
    });
  }, []);

  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Health Records" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[24]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new health record
        </CButton>
      </div>
      <HealthRecordTable
        healthRecords={healthRecords}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[24]?.Edit
        }
        viewPermission={
          userProgramsPermissions && userProgramsPermissions[24]?.View
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[24]?.Delete
        }
      />
      <HealthEditModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new health record"}
        employeeList={employeeList}
        healthInfoList={healthInfoList}
        data={data}
        setData={setData}
      />
    </CCard>
  );
};

export default HealthManagement;
