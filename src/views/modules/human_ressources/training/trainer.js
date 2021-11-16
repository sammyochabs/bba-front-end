import { CCardBody, CRow, CCol, CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoanTypes } from 'src/actions/loantypes'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import {
  fetchEducationlist,
  fetchEmployeeDropdown,
} from 'src/actions/HumanRessource/Trainer.services'
import TrainerTable from './TrainerTable'
import TrainerModal from './TrainerModal'
import { ExportCSV } from 'src/actions/ExportCSV'
const Trainer = () => {
  // const dispatch = useDispatch();
  const [trainerList, setTrainer] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const userID = localStorage.getItem('userID')
  useEffect(async () => {
    setTrainer(await fetchEducationlist(userID))
    setEmployeeList(await fetchEmployeeDropdown(userID))
  }, [])
  //  const { loantypes } = useSelector(state => state.loantype)
  const [modal, setModal] = useState(false)
  const [responseModal, setResponseModal] = useState(false)
  const toggle = () => {
    setResponseModal(false)
    setModal(!modal)
  }

  const reInitalizeList = async () => {
    setTrainer(await fetchEducationlist(userID))
  }

  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Trainer List" />
        <CRow>
          <CCol sm="12">
            <CButton onClick={toggle} color="info">
              + Add Trainer
            </CButton>
            <ExportCSV
              color="info"
              csvData={trainerList}
              fileName={'Trainer-list'}
            />
          </CCol>
        </CRow>
      </div>

      <TrainerTable
        employeeList={trainerList}
        userID={userID}
        employeedropdown={employeeList}
        reInitalizeList={reInitalizeList}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
      <TrainerModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new Trainer'}
        currentValue={userID}
        employeedropdown={employeeList}
        reInitalizeList={reInitalizeList}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
    </CCard>
  )
}

export default Trainer
