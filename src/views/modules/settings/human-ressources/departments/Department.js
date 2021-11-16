import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartments } from '../../../../../actions/department'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import DepartmentModal from './DepartmentModal'
import DepartmentTable from './DepartmentTable'

const Designation = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchDepartments(userID))
  }, [dispatch])
  const { departments } = useSelector((state) => state.departments)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Departments" />
        <CButton onClick={toggle} color="info">
          + Add new departments
        </CButton>
      </div>
      <DepartmentTable departments={departments} userID={userID} />
      <DepartmentModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new departments'}
      />
    </CCard>
  )
}

export default Designation
