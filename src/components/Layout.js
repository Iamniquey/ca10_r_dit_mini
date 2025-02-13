import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({children}) => {
  return (
    <div>
      Header
      <Outlet />
      Footer
    </div>
  );
};

export default Layout;
