import React, { useRef } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import "./ChartLayout.scss";

const ChartLayout = (props) => {
  const { heading, description, children, loading } = props;

  return (
    <div className="chartLayout">
      <div className="chartHeader">
        <div className="chartDetail">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="chartSvg">
        {loading && <Loading />}
        {!loading && children}
      </div>
    </div>
  );
};

export default ChartLayout;
