import React from 'react';
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdIcons.MdDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'My profile',
    path: '/profile',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Library',
    path: '/library',
    icon: <MdIcons.MdLibraryBooks />,
    cName: 'nav-text'
  },
  {
    title: 'Add book',
    path: '/addBook',
    icon: <MdIcons.MdAddCircleOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Manage users',
    path: '/manageUsers',
    icon: <FiIcons.FiUsers />,
    cName: 'nav-text'
  },
  
];
