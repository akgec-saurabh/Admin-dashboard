import React from "react";
import "./ChartLayout.scss";

const ChartLayout = (props) => {
  const { heading, description, children } = props;
  return (
    <div className="chartLayout">
      <div className="chartHeader">
        <div className="chartDetail">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="chartFilter">
          <div>Labels</div>
          <select name="cars" id="cars">
            <option defaultValue value="option1">
              option1
            </option>
            <option value="option2">option2</option>
          </select>
        </div>
      </div>
      <div className="chartSvg">{children}</div>
    </div>
  );
};

export default ChartLayout;
