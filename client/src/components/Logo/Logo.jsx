import React, { useContext } from "react";
import "./Logo.scss";

import AdjustOutlined from "@mui/icons-material/AdjustOutlined";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../../context/Sidebar";
const Logo = ({ collapse }) => {
  const { button, ButtonClickHandler, closeMobileMenuHandler } =
    useContext(Sidebar);

  return (
    <div className={`logo ${collapse ? "expand" : ""}`}>
      <div className="logo__container">
        <div className="logoIcon">
          <img
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template-vue2/documentation/logo.svg"
            alt=""
          />
        </div>
        <div className="logo__name">Vuexy</div>
      </div>

      <div
        onClick={() => {
          closeMobileMenuHandler();
        }}
        className="mobileClose"
      >
        <CloseIcon />
      </div>
      <div
        onClick={() => {
          ButtonClickHandler();
        }}
        className="circle"
      >
        {button ? (
          <LensOutlinedIcon className="adjustIcon" />
        ) : (
          <AdjustOutlined className="adjustIcon" />
        )}
      </div>
    </div>
  );
};

export default Logo;
