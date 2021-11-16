import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Notification from './components/notification'
import { Link } from 'react-router-dom'

const TheHeaderDropdownNotif = () => {
  const itemsCount = 5
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu
        placement="bottom-end"
        className="pt-0"
        style={{ width: '300px' }}
      >
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
        <Notification />
        <CDropdownItem header tag="div" color="light">
          <Link to="/notifications">
            <strong className="text-center">See all</strong>
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif
