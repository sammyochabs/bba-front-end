import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAcrClasses } from '../../../../../actions/acrClass'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import AcrClassModal from './AcrClassModal'
import AcrClassTable from './AcrClassTable'

const Designation = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchAcrClasses(userID))
  }, [dispatch])
  const { acrClass } = useSelector((state) => state.acrClass)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="ACRClass" />
        <CButton onClick={toggle} color="info">
          + Add new ACRClass
        </CButton>
      </div>
      <AcrClassTable acrClass={acrClass} userID={userID} />
      <AcrClassModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new ACRClass'}
      />
    </CCard>
  )
}

export default Designation
