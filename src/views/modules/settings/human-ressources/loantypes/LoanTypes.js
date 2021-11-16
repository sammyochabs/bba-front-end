import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoanTypes } from 'src/actions/loantypes'
import LoanTypeModal from 'src/views/modules/settings/human-ressources/loantypes/LoanTypeModal'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import LoanTypesTable from './LoanTypesTable'

const Loantypes = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchLoanTypes(userID))
  }, [dispatch])
  const { loantypes } = useSelector((state) => state.loantype)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Loan types" />
        <CButton onClick={toggle} color="info">
          + Add new loan type
        </CButton>
      </div>
      <LoanTypesTable loantypes={loantypes} userID={userID} />
      <LoanTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new loan type'}
      />
    </CCard>
  )
}

export default Loantypes
