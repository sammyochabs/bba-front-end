import React, { useState } from "react";
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Edit, Trash } from "react-feather";
import { deleteDistrict } from "../../../../../actions/district";
import DistrictModal from "./DistrictModal";
import DeleteDialog from "src/reusable/DeleteDialog";

const DistrictTable = ({ districts, userID }) => {
  const [modal, setModal] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [districtId, setCurrentDistrictId] = useState();
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentDistrictId(id);
    setSelectedItem(item);
  };

  const fields = [
    { key: "DISTRICT_ID", _style: { width: "50%" } },
    { key: "DISTRICT", _style: { width: "50%" } },
    { key: "Action", sorter: false, filter: false },
  ];

  const handleDelete = (id) => {
    setCurrentDistrictId(id);
    setDeleteModal(!delete_modal);
  };

  return (
    <div>
      <CDataTable
        items={districts}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        striped
        pagination
        // loading
        // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
        scopedSlots={{
          Action: (item) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name={"cilSettings"} size={"lg"} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() => handleUpdate(item.DISTRICT_ID, item)}
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      Edit
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleDelete(item.DISTRICT_ID)}
                    >
                      <Trash className="c-icon-lg mr-3" />
                      Delete
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            );
          },
        }}
      />
      <DistrictModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update leave"}
        currentValue={districtId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={districtId}
        _key="DistrictID"
        del_funtion={deleteDistrict}
      />
    </div>
  );
};

export default DistrictTable;
