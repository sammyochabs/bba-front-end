import React from "react";
import CIcon from "@coreui/icons-react";
import { Lock, Users } from "react-feather";
const MyFunction = () => {
  alert("rrrr"); // window.open('https://www.facebook.com/ ', '_blank')
};

let userProgramsPermissions;

if (localStorage.getItem("userProgramsPermissions") !== "undefined") {
  userProgramsPermissions = JSON.parse(
    localStorage.getItem("userProgramsPermissions")
  );
}

console.log(userProgramsPermissions);
const _nav = {
  settings: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard Admin",
      to:
        userProgramsPermissions && userProgramsPermissions[16]?.Permission === 1
          ? "/dashboard"
          : "no-permission",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },

    {
      _tag: "CSidebarNavTitle",
      _children: ["Settings"],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Human ressources",
      route: "/settings ",
      icon: <Users className="mr-3" size="20" />,
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Loan Type",
          programid: "1",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[1]?.Permission === 1
              ? "/settings/loantype"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Grades",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[2]?.Permission === 1
              ? "/settings/Grades"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Leave types & duration",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[3]?.Permission === 1
              ? "/settings/leaves"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Loan Funds",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[4]?.Permission === 1
              ? "/settings/loanfunds"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Districts",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[5]?.Permission === 1
              ? "/settings/district"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Designations",
          to: "/settings/designation",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[6]?.Permission === 1
              ? "/settings/designation"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Departments",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[7]?.Permission === 1
              ? "/settings/department"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Punishment",
          to: "/settings/punishment",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[8]?.Permission === 1
              ? "/settings/punishment"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "ACRClass",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[9]?.Permission === 1
              ? "/settings/acrclass"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "ACRType",
          to: "/settings/acrtype",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[10]?.Permission === 1
              ? "/settings/arctype"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Health Infos",
          to: "/settings/health_info",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[11]?.Permission === 1
              ? "/settings/health_info"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Document type",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[12]?.Permission === 1
              ? "/settings/document_type"
              : "no-permission",
        },
        /*{
          _tag: 'CSidebarNavItem',
          name: 'Overtime',
          to: '/settings/overtime',
        },*/
      ],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Users permission",
      icon: <Lock className="mr-3" size="20" />,
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Users",

          to:
            userProgramsPermissions &&
            userProgramsPermissions[14]?.Permission === 1
              ? "/settings/users"
              : "no-permission",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Roles",
          to: "/settings/role",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[13]?.Permission === 1
              ? "/settings/role"
              : "no-permission",
        },
      ],
    },
    {
      _tag: "CSidebarNavDivider",
    },
  ],
  human_ressources: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard Employee",
      to: "/dashboardEmployee",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavTitle",
      _children: ["Human ressources"],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Employees",
      route: "/base",
      icon: "cil-puzzle",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "All Employees",
          to: "/HR/listEmployee",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Education",
          to: "/HR/listEducations",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Promotion/Change",
          to: "/HR/listPromotions",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Training",
          to: "/HR/listTraining",
        },
      ],
    },
    {
      _tag: "CSidebarNavItem",
      name: "Loan Managment",
      to: "/HR/Loanmanagement",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavItem",
      name: "Leave Managment",
      to: "/HR/Leavemanagement",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    /*{
      _tag: 'CSidebarNavItem',
      name: 'OverTime Management',
      to: '/HR/OverTimemanagement',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },*/
    {
      _tag: "CSidebarNavItem",
      name: "Health Managment",
      to: "/HR/HealthManagement",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavItem",
      name: "Discipline Managment",
      to: "/HR/disciplinemanagement",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
  ],
  store_management: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },

    {
      _tag: "CSidebarNavDropdown",
      name: "Requisitions",
      route: "/store_management ",
      icon: <Users className="mr-3" size="20" />,
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Requisition",
          to: "/store_management/requisition",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Requisition Managment",
          to: "/store_management/new",
        },
        {
          _tag: "CSidebarNavItem",
          name: "All Requisition",
          to: "/store_management/punishment",
        },
      ],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Warehouse",
      route: "/store_management ",
      icon: <Users className="mr-3" size="20" />,
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Pending requisition",
          to: "/store_management/requisition",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Needs for supply",
          to: "/store_management/new",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Supply Request  ",
          to: "/store_management/punishment",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Receipt of purchases",
          to: "/store_management/punishment",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Requisition Output",
          to: "/store_management/punishment",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Extra Output",
          to: "/store_management/punishment",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Stock Situation",
          to: "/store_management/punishment",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Stock Valuation ",
          to: "/store_management/punishment",
        },
      ],
    },
  ],
  administration: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",

      to:
        userProgramsPermissions && userProgramsPermissions[0]?.Permission === 1
          ? "/dashboard"
          : "/no-permission",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard Employee",
      to:
        userProgramsPermissions && userProgramsPermissions[17]?.Permission === 1
          ? "/dashboardEmployee"
          : "/no-permission",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Human ressources",
      route: "/base",
      icon: "cil-puzzle",
      _children: [
        {
          _tag: "CSidebarNavDropdown",
          name: "Employees",
          route: "/base",
          icon: "cil-puzzle",
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "All Employees",
              to:
                userProgramsPermissions &&
                userProgramsPermissions[18]?.Permission === 1
                  ? "/HR/listEmployee"
                  : "/no-permission",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Education",
              to:
                userProgramsPermissions &&
                userProgramsPermissions[19]?.Permission === 1
                  ? "/HR/listEducations"
                  : "/no-permission",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Promotion/Change",

              to:
                userProgramsPermissions &&
                userProgramsPermissions[20]?.Permission === 1
                  ? "/HR/listPromotions"
                  : "/no-permission",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Training",
              to:
                userProgramsPermissions &&
                userProgramsPermissions[21]?.Permission === 1
                  ? "/HR/listTraining"
                  : "/no-permission",
            },
          ],
        },
        {
          _tag: "CSidebarNavItem",
          name: "Loan Management",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[22]?.Permission === 1
              ? "/HR/loanManagement"
              : "/no-permission",
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
        {
          _tag: "CSidebarNavItem",
          name: "Leave Management",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[23]?.Permission === 1
              ? "/HR/Leavemanagement"
              : "/no-permission",
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
        /*{
          _tag: 'CSidebarNavItem',
          name: 'OverTime Management',
          to: '/HR/OverTimemanagement',
          icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
        },*/
        {
          _tag: "CSidebarNavItem",
          name: "Health Management",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[24]?.Permission === 1
              ? "/HR/HealthManagement"
              : "/no-permission",
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
        {
          _tag: "CSidebarNavItem",
          name: "Discipline Management",
          to: "/HR/disciplinemanagement",
          to:
            userProgramsPermissions &&
            userProgramsPermissions[25]?.Permission === 1
              ? "/HR/disciplinemanagement"
              : "/no-permission",
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
      ],
    },

    {
      _tag: "CSidebarNavDropdown",
      name: "Store Management",
      to:
        userProgramsPermissions && userProgramsPermissions[26]?.Permission === 1
          ? "/base"
          : "/no-permission",
      icon: "cil-puzzle",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Store Management",
          to: "/test-out",
          //URL: 'www.google.com',
          //onclick: { MyFunction },
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
      ],
    },
    {
      _tag: "CSidebarNavItem",
      name: "Estate",
      to: "/estate",
      icon: "cil-puzzle",
      //_children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "IT",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Vehicle",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
  ],
  finance: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "CPF",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "FDR",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavItem",
      name: "Accounts",
      to: "/account",
      icon: "cil-puzzle",
      //_children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Payroll",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
  ],
  planing: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Report",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Monitoring",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Safeguard",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
  ],
  technical: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Road",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Bridge",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "RTW Monitoring",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Design",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
  ],
  operation: [
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },

    {
      _tag: "CSidebarNavDropdown",
      name: "Bangabandhu Setu",
      to: "/base",
      icon: "cil-puzzle",
      _children: [],
    },
  ],
};

export default _nav;
