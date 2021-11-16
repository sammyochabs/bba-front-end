import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDistricts } from '../../../../../actions/district'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import DistrictModal from './DistrictModal'
import DistrictTable from './DistrictTable'

const District = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchDistricts(userID))
  }, [dispatch])
  const { districts } = useSelector((state) => state.districts)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="District" />
        <CButton onClick={toggle} color="info">
          + Add new District
        </CButton>
      </div>
      <DistrictTable districts={districts} userID={userID} />
      <DistrictModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new District'}
      />
    </CCard>
  )
}

export default District
