import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaves } from 'src/actions/leaves'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import LeavesModal from './LeavesModal'
import LeavesTable from './LeavesTable'

const Leaves = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchLeaves(userID))
  }, [dispatch])
  const { leaves } = useSelector((state) => state.leaves)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Leaves & duration" />
        <CButton onClick={toggle} color="info">
          + Add new leave
        </CButton>
      </div>
      <LeavesTable leaves={leaves} userID={userID} />
      <LeavesModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new leaves'}
      />
    </CCard>
  )
}

export default Leaves
