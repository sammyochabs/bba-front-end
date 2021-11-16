import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDesignations } from '../../../../../actions/designation'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import DesignationModal from './DesignationModal'
import DesignationTable from './DesignationTable'

const Designation = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchDesignations(userID))
  }, [dispatch])
  const { designations } = useSelector((state) => state.designations)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Designations" />
        <CButton onClick={toggle} color="info">
          + Add new designations
        </CButton>
      </div>
      <DesignationTable designations={designations} userID={userID} />
      <DesignationModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new designations'}
      />
    </CCard>
  )
}

export default Designation
