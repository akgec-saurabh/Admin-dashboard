import React from "react";
import "./Item.scss";

import LensOutlinedIcon from "@mui/icons-material/LensOutlined";

const Item = ({ itemName }) => {
  return (
    <div className="item">
      <LensOutlinedIcon className="icon" />
      <div className="item__name">{itemName}</div>
    </div>
  );
};

export default Item;
