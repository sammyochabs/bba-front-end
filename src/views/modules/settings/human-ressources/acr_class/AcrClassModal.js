import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkBeforeUpdate } from "src/actions/global";
import { addAcrClass, updateAcrClass } from "../../../../../actions/acrClass";

const AcrClassModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedItem,
}) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  var formData = new FormData();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    return console.log(data);
  };

  const handleSubmit = (e, type) => {
    switch (type) {
      case "Add":
        formData.append("ACRClass", data.acrClass);
        dispatch(addAcrClass(formData, userID));

        toggle();
        break;
      case "Update":
        formData.append("ACRClassID", currentValue);
        formData.append(
          "ACRClass",
          checkBeforeUpdate(data.acrClass, selectedItem?.ACRClass)
        );
        dispatch(updateAcrClass(formData, userID));
        toggle();
        break;

      default:
        break;
    }
  };
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <div>
                  <CLabel htmlFor="nf-department">ACRClass title</CLabel>
                </div>
                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="acrClass"
                  onChange={handleInput}
                  defaultValue={selectedItem?.ACRClass}
                  required
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={(e) => handleSubmit(e, type)}>
          {type}
        </CButton>{" "}
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AcrClassModal;
