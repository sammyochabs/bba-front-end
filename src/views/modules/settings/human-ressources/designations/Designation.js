import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignations } from "../../../../../actions/designation";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import DesignationModal from "./DesignationModal";
import DesignationTable from "./DesignationTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";

const Designation = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchDesignations(userID));
  }, [dispatch]);
  const { designations } = useSelector((state) => state.designations);
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
        <SettingPageTitle title="Designations" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[6]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new designations
        </CButton>
      </div>
      <DesignationTable
        designations={designations}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[6]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[6]?.Delete
        }
      />
      <DesignationModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new designations"}
      />
    </CCard>
  );
};

export default Designation;
