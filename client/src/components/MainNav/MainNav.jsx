import React, { useState } from "react";
import Logo from "../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import "./MainNav.scss";

const MainNav = () => {
  const [buttonClick, setButtonClick] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const ButtonClickHandler = () => {
    setButtonClick(!buttonClick);
    console.log("Click", collapse);
  };

  return (
    <div
      onMouseEnter={() => {
        setCollapse(false);
      }}
      onMouseLeave={() => {
        if (buttonClick) {
          setCollapse(true);
        } else {
          if (buttonClick) {
            setCollapse(false);
          }
        }
      }}
      className={`mainNav ${collapse ? "expandMain" : ""}`}
    >
      <Logo
        button={buttonClick}
        onClick={ButtonClickHandler}
        collapse={collapse}
      />
      <NavItems collapse={collapse} />
    </div>
  );
};

export default MainNav;
