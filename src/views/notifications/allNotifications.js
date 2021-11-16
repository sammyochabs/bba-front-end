import { CCard } from "@coreui/react";
import React from "react";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const AllNotifications = () => {
  return (
    <div>
      <CCard className="p-5">
        <div className="hr-header">
          <SettingPageTitle title="Notifications" />
        </div>
      </CCard>
    </div>
  );
};

export default AllNotifications;
