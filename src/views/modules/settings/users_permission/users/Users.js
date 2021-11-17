import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "src/actions/employee";
import { fetchRoles } from "src/actions/role";
import { fetchUsers } from "src/actions/users";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import UsersModal from "./UsersModal";
import UsersTable from "./UsersTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";

const Users = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  console.log(userID, "user");
  useEffect(() => {
    dispatch(fetchUsers(userID));
    dispatch(fetchRoles(userID));
    dispatch(fetchEmployees(userID));
  }, [dispatch]);
  const { users } = useSelector((state) => state.users);
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
        <SettingPageTitle title="Users" />
        <CButton
          onClick={() => {
            if (
              userProgramsPermissions &&
              userProgramsPermissions[14]?.Add === 1
            ) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new user
        </CButton>
      </div>
      <UsersTable
        users={users}
        userID={userID}
        editPermission={
          userProgramsPermissions && userProgramsPermissions[14]?.Edit
        }
        deletePermission={
          userProgramsPermissions && userProgramsPermissions[14]?.Delete
        }
      />
      <UsersModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new user"}
      />
    </CCard>
  );
};

export default Users;
