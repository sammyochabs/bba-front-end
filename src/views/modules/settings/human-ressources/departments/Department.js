import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../../../../actions/department";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import DepartmentModal from "./DepartmentModal";
import DepartmentTable from "./DepartmentTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";

const Designation = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchDepartments(userID));
  }, [dispatch]);
  const { departments } = useSelector((state) => state.departments);
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

  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Departments" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[7]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new departments
        </CButton>
      </div>
      <DepartmentTable
        departments={departments}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[7]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[7]?.Delete
        }
      />
      <DepartmentModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new departments"}
      />
    </CCard>
  );
};

export default Designation;
