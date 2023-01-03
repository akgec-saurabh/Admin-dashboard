import React from "react";
import "./HeaderNav.scss";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import Translate from "@mui/icons-material/Translate";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import { Badge } from "@mui/material";
import { useContext } from "react";
import Sidebar from "../../context/Sidebar";

const HeaderNav = () => {
  const { closeMobileMenuHandler } = useContext(Sidebar);
  const mobileMenuHandler = () => {
    closeMobileMenuHandler();
  };
  return (
    <div className="headerNav">
      <div className="left">
        <div onClick={mobileMenuHandler} className="mobile">
          <MenuIcon />
        </div>
        <div className="hover">
          <SearchOutlined />
        </div>

        <div className="search">Search</div>
      </div>
      <div className="right">
        <div className="hover">
          <Translate />
        </div>
        <div className="hover">
          <LightModeOutlined />
        </div>
        <div className="hover">
          <DashboardCustomizeOutlined />
        </div>

        <div className="hover">
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "red",
              },
            }}
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={4}
            color="primary"
          >
            <NotificationsNoneOutlined />
          </Badge>
        </div>

        <div className="hover userprofile">
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#00ff00",
              },
            }}
            className="badge"
            overlap="circular"
            badgeContent=" "
            color="primary"
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className="user__image">
              <img
                src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/assets/avatar-1.129659bb.png"
                alt="user"
              />
            </div>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
