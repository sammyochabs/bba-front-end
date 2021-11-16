import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmpDropdown,
  fetchLeave,
  fetchLeaveType,
} from 'src/actions/HumanRessource/empleave'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import EmpLeaveModal from './EmpLeaveModal'
import EmpLeaveTable from './EmpLeaveTable'

const EmpLeave = () => {
  const dispatch = useDispatch()

  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchLeave(userID))
    dispatch(fetchEmpDropdown(userID))
    dispatch(fetchLeaveType(userID))
  }, [dispatch])

  const { empleave } = useSelector((state) => state.empleave)
  const { emplist } = useSelector((state) => state.emplist)

  const { leavelist } = useSelector((state) => state.leavelist)
  console.log(leavelist, 'leavelist555')

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Employee Leave Request" />
        <CButton onClick={toggle} color="info">
          + Add new Employee Leave Request
        </CButton>
      </div>
      <EmpLeaveTable
        leavesData={empleave}
        userID={userID}
        emplist={emplist}
        leavelist={leavelist}
      />
      <EmpLeaveModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new Leave Request'}
        emplist={emplist}
        leavelist={leavelist}
      />
    </CCard>
  )
}

export default EmpLeave
