import React, { useState, useContext } from "react";
import Sidebar from "../../context/Sidebar";
import Logo from "../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import "./MainNav.scss";

const MainNav = () => {
  const { button, ButtonClickHandler, mobileMenu } = useContext(Sidebar);
  const [collapse, setCollapse] = useState(false);
  console.log(mobileMenu);

  return (
    <div
      onMouseEnter={() => {
        setCollapse(false);
      }}
      onMouseLeave={() => {
        if (button) {
          setCollapse(true);
        } else {
          if (button) {
            setCollapse(false);
          }
        }
      }}
      className={`mainNav ${collapse ? "expandMain" : ""} ${
        mobileMenu ? "" : "mobileMenuClose"
      }`}
    >
      <Logo button={button} onClickr={ButtonClickHandler} collapse={collapse} />
      <NavItems collapse={collapse} />
    </div>
  );
};

export default MainNav;
