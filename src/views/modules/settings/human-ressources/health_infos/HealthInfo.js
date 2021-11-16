import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHealthInfos } from 'src/actions/healthinfo'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import HealthInfoModal from './HealthInfoModal'
import HealthInfoTable from './HealthInfoTable'

const HealthInfo = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchHealthInfos(userID))
  }, [dispatch])
  const { healthInfos } = useSelector((state) => state.healthInfos)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Health information" />
        <CButton onClick={toggle} color="info">
          + Add new health infos
        </CButton>
      </div>
      <HealthInfoTable healthInfos={healthInfos} userID={userID} />
      <HealthInfoModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new health infos'}
      />
    </CCard>
  )
}

export default HealthInfo
