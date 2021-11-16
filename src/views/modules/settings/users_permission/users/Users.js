import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from 'src/actions/employee'
import { fetchRoles } from 'src/actions/role'
import { fetchUsers } from 'src/actions/users'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import UsersModal from './UsersModal'
import UsersTable from './UsersTable'

const Users = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  console.log(userID, 'user')
  useEffect(() => {
    dispatch(fetchUsers(userID))
    dispatch(fetchRoles(userID))
    dispatch(fetchEmployees(userID))
  }, [dispatch])
  const { users } = useSelector((state) => state.users)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Users" />
        <CButton onClick={toggle} color="info">
          + Add new user
        </CButton>
      </div>
      <UsersTable users={users} userID={userID} />
      <UsersModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new user'}
      />
    </CCard>
  )
}

export default Users
