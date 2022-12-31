import React from "react";
import { useRef } from "react";
import "./BarChart.scss";
import * as d3 from "d3";
import { height, width } from "@mui/system";

const BarChart = () => {
  const height = "424";
  const width = "424";
  const data = [
    { name: "oranges", value: 1500 },
    { name: "ff", value: 1400 },
    { name: "oraadfnges", value: 1020 },
    { name: "oraafdnges", value: 5300 },
  ];

  const barChartSvg = useRef();

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, width])
    .padding(0.3);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([0, height]);

  const svg = d3
    .select(barChartSvg.current)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const ok = svg
    .selectAll("bar")
    .data(data)
    .enter()
    .append("bar")
    .attr("x", (d) => x(d.name))
    .attr("y", 0)
    .attr("width", x.bandwidth)
    .attr("height", (d) => 23)
    .attr("fill", "blue");

  return <svg ref={barChartSvg}></svg>;
};

export default BarChart;
