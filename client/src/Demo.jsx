import React, { useRef } from "react";
import { unemploymentData } from "./data";

import * as d3 from "d3";
import LineChart from "./components/LineChart";

const Demo = () => {
  const detail = {
    x: (d) => d.date,
    y: (d) => d.unemployment,
    z: (d) => d.division,
    yLabel: "↑ Unemployment (%)",
    width: 1200,
    height: 500,
    color: "steelblue",
    voronoi: false, // if true, show Voronoi overlay
  };

  return (
    <div>
      <LineChart data={unemploymentData} info={detail} />
    </div>
  );
};

export default Demo;
