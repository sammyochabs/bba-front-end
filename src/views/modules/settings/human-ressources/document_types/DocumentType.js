import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentType } from '../../../../../actions/documentType'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import DocumentTypeModal from './DocumentTypeModal'
import DocumentTypeTable from './DocumentTypeTable'

const DocumentType = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchDocumentType(userID))
  }, [dispatch])
  const { documentTypes } = useSelector((state) => state.documentTypes)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Document type" />
        <CButton onClick={toggle} color="info">
          + Add new document type
        </CButton>
      </div>
      <DocumentTypeTable documentTypes={documentTypes} userID={userID} />
      <DocumentTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new document types'}
      />
    </CCard>
  )
}

export default DocumentType
