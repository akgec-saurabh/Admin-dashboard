import React, { useRef, useEffect, useState } from "react";
import ChartLayout from "../../components/ChartLayout/ChartLayout";
import DonutChart from "../../components/DonutChart/DonutChart";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import Pie from "../../components/PieChart/Pie";
import "./Chart.scss";
import StackedAreaChart from "../../components/StackedAreaChart/StackedAreaChart";

const data = [
  { item: "A", count: 590, value: 155 },
  { item: "B", count: 291, value: 590 },
  { item: "C", count: 348, value: 150 },
  { item: "D", count: 245, value: 400 },
  { item: "E", count: 45, value: 45 },
];

const Chart = () => {
  const [flag, setFlag] = useState(true);
  return (
    <div className="chart">
      <HeaderNav />

      <ChartLayout
        heading="Statistics"
        description="Commertial networks and enterprises"
      >
        <StackedAreaChart />
      </ChartLayout>

      <ChartLayout
        heading="Statistics"
        description="Commertial networks and enterprises"
      >
        <DonutChart data={data} width="300" height="300" />
      </ChartLayout>

      <ChartLayout
        heading="Statistics"
        description="Commertial networks and enterprises"
      >
        <Pie data={data} width="300" height="300" />
      </ChartLayout>
    </div>
  );
};

export default Chart;
