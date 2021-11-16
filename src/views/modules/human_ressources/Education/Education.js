import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CCard,
  CCol,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEducationlist,
  fetchEmployeeDropdown,
} from 'src/actions/HumanRessource/education.services'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import EducationTable from './EducationTable'
import EducationModal from './EducationModal'
import { ExportCSV } from 'src/actions/ExportCSV'
const Education = () => {
  const dispatch = useDispatch()
  const [educationlist, seteducationlist] = useState([])
  const [employeedd, setEmployeeList] = useState([])
  const userID = localStorage.getItem('userID')

  useEffect(async () => {
    let _educationList = []
    let _employeeList = []
    try {
      _educationList = await fetchEducationlist(userID)
      _employeeList = await fetchEmployeeDropdown(userID)
      seteducationlist(_educationList)
      setEmployeeList(_employeeList)
      _educationList.filter((el, index, array) => {
        _employeeList.filter((emp) => {
          if (emp.EmployeeID == el.EmployeeID) {
            el.EmployeeName = emp.Name
          }
        })
        if (index == array.length - 1) {
          seteducationlist([..._educationList])
        }
      })
    } catch (error) {}
  }, [])
  //  const { loantypes } = useSelector(state => state.loantype)
  const [modal, setModal] = useState(false)
  const [responseModal, setResponseModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
    setResponseModal(false)
  }

  const reInitalizeList = async () => {
    let _educationList = []
    try {
      _educationList = await fetchEducationlist(userID)
      _educationList.filter((el, index, array) => {
        employeedd.filter((emp) => {
          if (emp.EmployeeID == el.EmployeeID) {
            el.EmployeeName = emp.Name
          }
        })
        if (index == array.length - 1) {
          seteducationlist([..._educationList])
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Education List" />
        <CRow>
          <CCol sm="12">
            <CButton onClick={toggle} color="info">
              + Add Education
            </CButton>
            <ExportCSV
              color="info"
              csvData={educationlist}
              fileName={'Education-list'}
            />
          </CCol>
        </CRow>
      </div>
      <EducationTable
        employeeList={educationlist}
        userID={userID}
        employeedropdown={employeedd}
        seteducationlist={seteducationlist}
        reInitalizeList={reInitalizeList}
        setEmployeeList={setEmployeeList}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
      <EducationModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new Education'}
        currentValue={userID}
        employeedropdown={employeedd}
        reInitalizeList={reInitalizeList}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
    </CCard>
  )
}

export default Education
