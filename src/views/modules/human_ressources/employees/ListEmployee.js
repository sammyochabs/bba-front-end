import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
  CBadge,
  CButton,
  CDataTable,
  CLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CCard,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  deleteEmployee,
  fetchEmployees,
  getFile,
  fetchEmployeeImg,
} from 'src/actions/employee'
import { useDispatch, useSelector } from 'react-redux'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import LeavesModal from './LeaveModal'

const ListEmployee = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userID = localStorage.getItem('userID')
  const [modal, setModal] = useState(false)
  const [selectedEmpId, setSelectedEmpId] = useState(null)

  const toggle = (employeeId) => {
    setModal(!modal)
    setSelectedEmpId(employeeId)
  }
  useEffect(() => {
    dispatch(fetchEmployees(userID))
  }, [dispatch])
  const { employees = [] } = useSelector((state) => state.employees)
  useEffect(() => {
    employees?.forEach((item) => {
      dispatch(fetchEmployeeImg(item.EmployeeID, userID))
    })
  }, [employees])
  const formData = new FormData()
  const handleDelete = (employeeID, userID) => {
    formData.append('EmployeeID', employeeID)
    // console.log(formData.get("EmployeeID"))
    dispatch(deleteEmployee(formData, userID))
  }
  const fields = [
    // { key: "image", _style: { width: "20%" } },
    { key: 'Photo', label: 'Photo' },
    { key: 'RegistrationNumber' },
    { key: 'NameEnglish', _style: { width: '18%' } },
    { key: 'Designation' },
    { key: 'Department' },
    { key: 'DateBirth' },
    { key: 'JoigningDate' },
    { key: 'status' },
    { key: 'Phone' },
    { key: 'Email' },
    {
      key: 'action',
      label: 'Action',
      _style: { width: '5%' },
      sorter: false,
      filter: false,
    },
  ]
  const getBadge = (status) => {
    switch (status) {
      case 1:
        return 'success'
      case 0:
        return 'secondary'
      default:
        return 'primary'
    }
  }
  // employee show table
  // photo. id .name english .designation .departement .date birth. joinging date
  // Marital Status ,phone number. email adress, status
  return (
    <div>
      <CCard className="p-5">
        <div className="hr-header">
          <SettingPageTitle title="All Employees" />
          <Link to="/HR/AddEmployee">
            <CButton color="info" size="lg" onClick={() => {}}>
              + Add Employee
            </CButton>
          </Link>
        </div>

        <CDataTable
          items={employees}
          fields={fields}
          columnFilter
          footer
          itemsPerPage={5}
          hover
          sorter
          pagination
          scopedSlots={{
            Photo: (item) =>
              item.Photo || item.employeeImage ? (
                <td>
                  <img
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '100%',
                    }}
                    src={item.Photo || item.employeeImage || ''}
                  />
                </td>
              ) : (
                <td></td>
              ),

            status: (item) => (
              <td>
                <CBadge color={getBadge(item.Active)} alt="hello">
                  {item.Active !== 1 ? 'Inactive' : 'Active'}
                </CBadge>
              </td>
            ),
            action: (item, index) => {
              return (
                <td className="py-2">
                  <CDropdown className="m-1">
                    <CDropdownToggle>
                      <CIcon name="cil-settings" alt="CoreUI Icons Settings" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        onClick={() =>
                          history.push(`/HR/UpdateEmployee/${item.EmployeeID}`)
                        }
                      >
                        Update
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() =>
                          history.push(`/HR/ViewEmployee/${item.EmployeeID}`)
                        }
                      >
                        View
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          if (window.confirm('are you sure!'))
                            handleDelete(item.EmployeeID, userID)
                        }}
                      >
                        Delete
                      </CDropdownItem>
                      <CDropdownItem onClick={() => toggle(item.EmployeeID)}>
                        Leave
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </td>
              )
            },
          }}
        />
        <LeavesModal
          userID={userID}
          toggle={toggle}
          selectedEmpId={selectedEmpId}
          modal={modal}
          type={'Add'}
          title={'Add new leaves'}
        />
      </CCard>
    </div>
  )
}

export default ListEmployee