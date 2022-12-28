import React from "react";
import DonutChart from "../../components/DonutChart/DonutChart";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import "./Chart.scss";

const Chart = () => {
  return (
    <div className="chart">
      <HeaderNav />
      <DonutChart />
    </div>
  );
};

export default Chart;
