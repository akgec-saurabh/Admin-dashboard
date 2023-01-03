import React, { useEffect, useRef, useState } from "react";
import "./StackedAreaChart.scss";
import * as d3 from "d3";
import { axisLeft, axisTop } from "d3";
import { useHttpClient } from "../../hooks/use-http";
import Filter from "../Filter/Filter";
import { tip as d3tip } from "d3-v6-tip";

const StackedAreaChart = ({ transformData }) => {
  const svgRef = useRef();
  const [filter, setFilter] = useState("end_year");

  const width = 1200;
  const height = 500 + 50;
  const ticks = 8;

  const { sendReq, loading, error } = useHttpClient();

  useEffect(() => {
    const drawChart = (data) => {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .select(".svgbox");
      svg.selectAll("path").remove();
      d3.select(svgRef.current).select(".legend").selectAll("g").remove();

      //addding a container to svg elements

      //! MAIN PART STACKING !//
      //* https://medium.com/@louisemoxy/how-to-create-a-stacked-area-chart-with-d3-28a2fee0b8ca
      //* https://github.com/d3/d3-shape#stack
      //* https://d3-graph-gallery.com/graph/area_basic.html

      const stack = d3.stack().keys(["intensity", "likelihood", "relevance"]);
      // .order(d3.stackOrderNone);
      // .offset(d3.stackOrderNone);

      const stackValue = stack(data);
      console.log(stackValue);

      const stackData = [];

      stackValue.forEach((layer, index) => {
        const currentStack = [];
        layer.forEach((d, i) => {
          currentStack.push({
            value: d,
            name: data[i].name,
          });
        });
        stackData.push(currentStack);
      });
      console.log(stackData);

      //! -------------------!//

      const tooltip = d3tip()
        .attr("class", "d3-tip")
        .offset([10, -10])
        .direction("s")
        .html((d) => {
          // console.log(d.target.__data__.data);
          return `<div>Total : </div>
        <div>${filter} : </div>
        
        `;
        });
      svg.call(tooltip);

      // X Scale
      // const xScale = d3
      //   .scalePoint()
      //   .domain(d3.map(data, (d) => d.name))
      //   .range([0, width]);

      const xScale = d3
        .scalePoint()
        .domain([...new Set(data.map((d) => d.name))])
        .range([0, width]);
      // console.log([...new Set(data.map((d) => d.end_year))]);

      // // X Axis
      const xAxis = d3.axisBottom(xScale);
      svg
        .select(".x-axis")
        .style("transform", `translateY(${height}px)`)
        .call(xAxis)
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("x", -10)
        .attr("y", -2)
        .style("transform", " rotate(-90deg)");

      //Y Scale
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(stackValue[stackValue.length - 1], (dp) => dp[1])])
        .range([height, 0]);
      //Y Axis
      const yAxis = axisLeft(yScale).ticks(ticks);
      svg.select(".y-axis").call(yAxis);

      //XGRID
      const xGrid = axisTop(xScale)
        .ticks(ticks)
        .tickSize(-height)
        .tickFormat(" ");
      svg.select(".x-axis-grid").call(xGrid);

      //YGRID
      const yGrid = axisLeft(yScale)
        .ticks(data.length - 1)
        .tickSize(-width)
        .tickFormat(" ");
      svg.select(".y-axis-grid").call(yGrid);

      const color = d3
        .scaleOrdinal()
        .domain([0, 2])
        .range(["#5c497e", "#7c6d97", "#e0cefe"]);

      const area = d3
        .area()
        .x((d) => xScale(d.name))
        .y0((d) => yScale(d.value[0]))
        .y1((d) => yScale(d.value[1]));

      // console.log(area(stackData[0]));

      // Show the areas
      svg
        .selectAll(".les")
        .data(stackData)
        .join("path")
        .style("fill", (d, i) => {
          return color(i);
        })
        // .attr("stroke", "white")
        .attr("class", (d, i) => `arrow${i}`)
        .attr("d", (d) => {
          // console.log(area(d));
          return area(d);
        })
        .on("mouseover", tooltip.show)
        .on("mouseout", tooltip.hide);

      //ADDDING LEGEND TO THE G ELEMENT

      const legend = ["intensity", "likelihod", "relevance"];

      legend.forEach((l, i) => {
        const legendRow = d3
          .select(svgRef.current)
          .select(".legend")
          .attr("transform", `translate(0,-20)`)

          .append("g")
          .attr("transform", `translate(${100 * i},0)`);

        legendRow
          .append("rect")
          .attr("x", 0)
          .attr("y", -12)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", color(i));

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("text-anchor", "start")
          .style("text-transform", "capitalize")
          .style("fill", "var(--color)")
          .text(l);
      });
    };

    console.log(transformData);
    const tdata = d3
      .groups(transformData, (d) => d[filter])
      .map(([name, group]) => ({
        name: name ? name : 1990,
        intensity: d3.max(group, (d) => d.intensity),
        likelihood: d3.max(group, (d) => d.likelihood),
        relevance: d3.max(group, (d) => d.relevance),
      }));

    const somethingSorted = tdata.sort((x, y) => d3.ascending(x.name, y.name));

    drawChart(somethingSorted);
  }, [filter]);

  const onFilterHandler = (props) => {
    setFilter(props);
  };

  return (
    <div className="stackedArea">
      <Filter onFilter={onFilterHandler} />
      <svg ref={svgRef}>
        <g className="legend"></g>
        <g className="svgbox">
          <g className="x-axis"></g>
          <g className="y-axis"></g>
          <g className="x-axis-grid"></g>
          <g className="y-axis-grid"></g>
        </g>
      </svg>
    </div>
  );
};

export default StackedAreaChart;
