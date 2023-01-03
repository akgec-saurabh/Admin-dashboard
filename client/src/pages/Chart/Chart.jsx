import React, { useRef, useEffect, useState, useContext } from "react";
import ChartLayout from "../../components/ChartLayout/ChartLayout";
import DonutChart from "../../components/DonutChart/DonutChart";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import Pie from "../../components/PieChart/Pie";
import "./Chart.scss";
import StackedAreaChart from "../../components/StackedAreaChart/StackedAreaChart";
import ScatterChart from "../../components/ScatterChart/ScatterChart";
import LineChart from "../../components/LineChart/LineChart";
import { useHttpClient } from "../../hooks/use-http";
import * as d3 from "d3";
import Sidebar from "../../context/Sidebar";

const Chart = () => {
  const [transformData, setTransformData] = useState([]);
  const { sendReq, loading, error } = useHttpClient();
  const { button } = useContext(Sidebar);

  //PASSING DATA TO ALL THE CHARTS----------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendReq("https://52.0.181.40:5002/api/data");
      const transform = response.map((obj) => {
        return {
          ...obj,
          published: new Date(obj.published).getFullYear(),
          likelihood: obj.likelihood,
          relevance: obj.relevance,
          intensity: Math.sqrt(obj.intensity),
        };
      });

      setTransformData(transform);
    };
    fetchData();
  }, []);
  //PASSING DATA TO ALL THE CHARTS----------------------------------------------------------

  return (
    <div className={`chart ${button ? "nowcollapse" : ""}`}>
      <div className="blur"></div>
      <HeaderNav />

      <div className="two-chart">
        <ChartLayout
          heading="Chart for Total Sum Likelihood in that Segment/Year"
          description="Hover on Pie slices for details"
          loading={loading}
        >
          <Pie
            transformData={transformData}
            width="300"
            height="300"
            piefor="likelihood"
          />
        </ChartLayout>
        <ChartLayout
          heading="Chart for Total Sum Relevance in that Segment/Year"
          description="Hover on Pie slices for details"
          loading={loading}
        >
          <Pie
            transformData={transformData}
            width="300"
            height="300"
            piefor="relevance"
          />
        </ChartLayout>
      </div>
      <ChartLayout
        heading="Graph for [Maximum] Likelood vs Relevance vs Intensity(SquareRoot) "
        description="1990 is Uncategorized Category, touch on legend to hide or show, "
        loading={loading}
      >
        <LineChart transformData={transformData} />
      </ChartLayout>

      <ChartLayout
        heading="Scatter Graph for [Maximum] Likelood vs Relevance vs Intensity(SquareRoot)"
        description="For Visuals only I have multiplied likelood, relvance and Intensity with a random number[0 to 1] so every time you refresh the random number change so the graph will also data is fetched from MongoDB only"
        loading={loading}
        options={[
          "End Year",
          "Topics",
          "Pestle",
          "Sector",
          "Region",
          "Country",
        ]}
      >
        <ScatterChart transformData={transformData} />
      </ChartLayout>

      <ChartLayout
        heading="Stacked Area Graph for [Maximum] Likelood vs Relevance vs Intensity(SquareRoot) "
        description="1990 is Uncategorized Category, touch on legend to hide or show, "
        loading={loading}
      >
        <StackedAreaChart transformData={transformData} />
      </ChartLayout>
    </div>
  );
};

export default Chart;
