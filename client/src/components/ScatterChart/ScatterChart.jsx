import "./ScatterChart.scss";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { axisLeft, axisTop } from "d3";
import Filter from "../Filter/Filter";

const ScatterChart = ({ transformData }) => {
  const svgRef = useRef();
  const [filter, setFilter] = useState("end_year");

  const width = 1200;
  const height = 500 + 50;

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

      //addding a container to svg elements

      //X Scale
      const xScale = d3
        .scaleLinear()
        // .domain([0, d3.max(data, (d) => d.relevance)])
        .domain([0, d3.max(data, (d) => d.relevance)])
        .range([0, width]);

      // X Axis
      const xAxis = d3.axisBottom(xScale).ticks(5);
      svg
        .select(".x-axis")
        .style("transform", `translateY(${height}px)`)
        .call(xAxis);

      //Y Scale
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.likelihood)])
        .range([height, 0]);
      //Y Axis
      const yAxis = axisLeft(yScale);
      svg.select(".y-axis").call(yAxis);

      // //XGRID
      // const xGrid = axisTop(xScale)
      //   .ticks(ticks)
      //   .tickSize(-height)
      //   .tickFormat(" ");
      // svg.select(".x-axis-grid").call(xGrid);

      // //YGRID
      // const yGrid = axisLeft(yScale)
      //   .ticks(data.length - 1)
      //   .tickSize(-width)
      //   .tickFormat(" ");
      // svg.select(".y-axis-grid").call(yGrid);

      const colorr = d3
        .scaleOrdinal()
        .domain([...new Set(data.map((d) => d.published))])
        .range([
          "#4e79a7",
          "#f28e2c",
          "#e15759",
          "#76b7b2",
          "#59a14f",
          "#edc949",
          "#af7aa1",
          "#ff9da7",
          "#9c755f",
          "#bab0ab",
        ]);

      svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "dots")

        .attr("class", (d) => d.relevance)
        .attr("stroke", "white")
        // .attr("stroke-width", "2px")
        .attr("cx", function (d) {
          return xScale(d.relevance);
        })
        .attr("cy", function (d) {
          return yScale(d.likelihood);
        })
        .attr("r", (d) => d.intensity)
        .style("fill", function (d) {
          return colorr(d[filter]);
        })
        .on("mouseover", (d) => {
          console.log();
        });

      //Adding Label
      const xlabel = d3
        .select(svgRef.current)
        .select(".svgbox")
        .select(".x-label")
        .append("text")
        .attr("y", -30)
        .attr("x", -height / 2)
        .style("transform", "rotate(-90deg)")
        .style("fill", "var(--color)")
        .text("Likelihood");

      const ylabel = d3
        .select(svgRef.current)
        .select(".svgbox")
        .select(".y-label")
        .append("text")
        .attr("y", height + 30)
        .attr("x", width / 2)
        .style("fill", "var(--color)")
        .text("Relevance");

      //ADDDING LEGEND TO THE G ELEMENT

      const legend = [...new Set(data.map((d) => d[filter]))];

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
          .attr("fill", colorr(i));

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("text-anchor", "start")
          .style("text-transform", "capitalize")
          .style("fill", "var(--color)")
          .text(l);
      });
    };

    // Randoming Likelihood,relevance and Intensity
    const randomData = transformData.map((obj) => {
      return {
        ...obj,
        likelihood: obj.likelihood * Math.random(),
        relevance: obj.relevance * Math.random(),
        intensity: obj.intensity,
      };
    });

    console.log(randomData);
    drawChart(randomData);
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
          <g className="x-label"></g>
          <g className="y-label"></g>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
          <g className="x-axis-grid"></g>
          <g className="y-axis-grid"></g>
        </g>
      </svg>
    </div>
  );
};

export default ScatterChart;
