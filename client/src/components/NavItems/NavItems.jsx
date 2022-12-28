import React from "react";
import "./NavItems.scss";
import Item from "../Item/Item";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useState } from "react";

const NavItems = ({ collapse }) => {
  const [show, setShow] = useState(false);

  const showItemList = () => {
    setShow(!show);
  };

  return (
    <div className={`navItems ${collapse ? "expand" : ""}`}>
      <div className="items">
        <div onClick={showItemList} className="items__container">
          <div className="main__item">
            <EmailOutlinedIcon className="mainIcon" />
            <div className="item__label">Dashbords</div>
          </div>
          <ArrowForwardIosOutlinedIcon
            sx={{
              transition: "all 0.2s",
              transform: `${show ? "rotate(90deg)" : ""}`,
            }}
            className="icon"
          />
        </div>
        <div
          style={{
            height: `${show ? "auto" : "0"}`,
            visibility: `${show ? "unset" : "hidden"}`,
          }}
          className="itemList"
        >
          <Item itemName="Analytics" />
          <Item itemName="eCommerce" />
          <Item itemName="CRM" />
        </div>
      </div>

      <div className="item__heading">APPS & PAGES</div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <EmailOutlinedIcon className="mainIcon" />
            <div className="item__label">Email</div>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <ChatBubbleOutlineOutlinedIcon className="mainIcon" />
            <div className="item__label">Chat</div>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <CalendarTodayOutlinedIcon className="mainIcon" />
            <div className="item__label">Calendar</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <InsertDriveFileOutlinedIcon className="mainIcon" />
            <div className="item__label">Invoice</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <PersonOutlineOutlinedIcon className="mainIcon" />
            <div className="item__label">User</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <InsertDriveFileOutlinedIcon className="mainIcon" />
            <div className="item__label">Pages</div>
          </div>
        </div>
      </div>

      <div className="item__heading">UI ELEMENTS</div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <InsertDriveFileOutlinedIcon className="mainIcon" />
            <div className="item__label">Typography</div>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <VisibilityOutlinedIcon className="mainIcon" />
            <div className="item__label">Icons</div>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <CreditCardOutlinedIcon className="mainIcon" />
            <div className="item__label">Cards</div>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <CallToActionOutlinedIcon className="mainIcon" />
            <div className="item__label">Components</div>
          </div>
        </div>
      </div>

      <div className="item__heading">FORMS</div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <DashboardOutlinedIcon className="mainIcon" />
            <div className="item__label">Form Elements</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <DashboardOutlinedIcon className="mainIcon" />
            <div className="item__label">Form Layouts</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <TaskAltOutlinedIcon className="mainIcon" />
            <div className="item__label">Form Validation</div>
          </div>
        </div>
      </div>

      <div className="item__heading">CHARTS</div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <CandlestickChartOutlinedIcon className="mainIcon" />
            <div className="item__label">Charts</div>
          </div>
        </div>
      </div>
      <div className="item__heading">OTHERS</div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <ShieldOutlinedIcon className="mainIcon" />
            <div className="item__label">Components</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <MenuOutlinedIcon className="mainIcon" />
            <div className="item__label">Components</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <VisibilityOffOutlinedIcon className="mainIcon" />
            <div className="item__label">Components</div>
          </div>
        </div>
      </div>

      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <VolunteerActivismOutlinedIcon className="mainIcon" />
            <div className="item__label">Raise Support</div>
          </div>
        </div>
      </div>
      <div className="items">
        <div className="items__container">
          <div className="main__item">
            <InsertDriveFileOutlinedIcon className="mainIcon" />
            <div className="item__label">Documentation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavItems;
