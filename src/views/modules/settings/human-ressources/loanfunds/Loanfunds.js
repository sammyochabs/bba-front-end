import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoanFunds } from 'src/actions/loanfunds'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import LoanfundsModal from './LoanfundsModal'
import LoanfundsTable from './LoanfundsTable'

const LoanFunds = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchLoanFunds(userID))
  }, [dispatch])
  const { loanfunds } = useSelector((state) => state.loanfunds)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Loan Funds" />
        <CButton onClick={toggle} color="info">
          + Add new loan funds
        </CButton>
      </div>
      <LoanfundsTable loanfunds={loanfunds} userID={userID} />
      <LoanfundsModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new loan funds'}
      />
    </CCard>
  )
}

export default LoanFunds
