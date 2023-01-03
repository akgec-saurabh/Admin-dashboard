import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { axisLeft, axisTop, curveCardinal } from "d3";
import "./LineChart.scss";
import Filter from "../Filter/Filter";

const LineChart = ({ transformData }) => {
  const svgRef = useRef();
  const [filter, setFilter] = useState("end_year");

  const width = 1200;
  const height = 500;

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
        .scalePoint()
        .domain([...new Set(data.map((d) => d.name))])
        .range([0, width]);

      //   const intensityScale = d3
      //     .scaleLinear()
      //     .domain([0, d3.max(data, (d) => d.intensity)])
      //     .range([height, 0]);

      // X Axis
      const xAxis = d3.axisBottom(xScale).ticks(5);
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
        .domain([0, d3.max(data, (d) => d.intensity)])
        .range([height, 0]);
      //Y Axis
      const yAxis = axisLeft(yScale);
      svg.select(".y-axis").call(yAxis);

      //XGRID
      const xGrid = axisTop(xScale).tickSize(-height).tickFormat(" ");
      svg.select(".x-axis-grid").call(xGrid);

      //YGRID
      const yGrid = axisLeft(yScale)
        .ticks(data.length - 1)
        .tickSize(-width)
        .tickFormat(" ");
      svg.select(".y-axis-grid").call(yGrid);

      //---------------------------------DRAWING LINE -------------------------------
      const lines = ["likelihood", "relevance", "intensity"];
      const color = ["steelblue", "#FFB100", "#7DCE13"];

      lines.forEach((l, i) => {
        d3.select(svgRef.current)
          .select(".svgbox")
          .select(".paths")
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("class", `line path-${l}`)

          .attr("stroke", color[i])
          .attr("stroke-width", 3)
          .attr(
            "d",
            d3
              .line()
              .x((d) => xScale(d.name))
              .y((d) => {
                // if (l == "intensity") {
                //   return intensityScale(d[l]);
                // }
                return yScale(d[l]);
              })
              .curve(curveCardinal)
          );
      });

      const ylabel = d3
        .select(svgRef.current)
        .select(".svgbox")
        .select(".y-label")
        .append("text")
        .attr("y", height + 70)
        .attr("x", width / 2)
        .style("fill", "var(--color)")
        .text("End year");

      //ADDDING LEGEND TO THE G ELEMENT

      lines.forEach((l, i) => {
        const legendRow = d3
          .select(svgRef.current)
          .select(".legend")
          .attr("transform", `translate(0,-20)`)
          .append("g")
          .attr("transform", `translate(${100 * i},0)`);

        legendRow
          .append("rect")
          .attr("class", l)
          .attr("x", 0)
          .attr("y", -12)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", color[i])
          .on("click", (e) => {
            d3.select(`.path-${e.path[0].classList.value}`).classed(
              "selected",
              d3
                .select(`.path-${e.path[0].classList.value}`)
                .classed("selected")
                ? false
                : true
            );
          });

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("text-anchor", "start")
          .style("text-transform", "capitalize")
          .style("fill", "var(--color)")
          .text(l);

        //!------------------------------------------------------
      });
    };
    const tdata = d3
      .groups(transformData, (d) => d[filter])
      .map(([name, group]) => ({
        name: name ? name : 1990,
        intensity: d3.max(group, (d) => d.intensity),
        likelihood: d3.max(group, (d) => d.likelihood),
        relevance: d3.max(group, (d) => d.relevance),
      }));
    console.log(transformData);
    const somethingSorted = tdata.sort((a, b) =>
      parseInt(a.name) > parseInt(b.name)
        ? 1
        : parseInt(b.name) > parseInt(a.name)
        ? -1
        : 0
    );

    if (somethingSorted) {
      const a = somethingSorted[0];
      const b = somethingSorted[2];

      console.log(a, b);
    }

    console.log(somethingSorted);
    console.log(filter);

    drawChart(somethingSorted);
  }, [transformData, filter]);

  const onFilterHandler = (props) => {
    setFilter(props);
  };

  return (
    <div className="lineChart">
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
          <g className="paths"></g>
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
