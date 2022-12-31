import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = ({ data, height, width, flag }) => {
  const pieChart = useRef();
  const value = flag ? "count" : "value";

  useEffect(() => {
    // Get positions for each data object
    const piedata = d3.pie().value((d) => d[value])(data);
    // Define arcs for graphing
    const arc = d3
      .arc()
      .innerRadius(width / 3)
      .outerRadius(width / 2);

    const colors = d3.scaleOrdinal([
      "#ffa822",
      "#134e6f",
      "#ff6150",
      "#1ac0c6",
      "#dee0e6",
    ]);

    // Define the size and position of svg
    const svg = d3
      .select(pieChart.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      // .style('background-color','yellow')
      .append("g");
    // .attr("transform", `translate(${width / 2},${height / 2})`);

    // // Add tooltip
    // const tooldiv = d3
    //   .select("#chartArea")
    //   .append("div")
    //   .style("visibility", "hidden")
    //   .style("position", "absolute")
    //   .style("background-color", "red");

    // Draw pie
    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      // .attr("fill-opacity", 0)
      .attr("d", arc);

    // .attr("fill-opacity", 1);
    // .on("mouseover", (e, d) => {
    //   console.log(e);
    //   console.log(d);

    //   tooldiv
    //     .style("visibility", "visible")
    //     .text(`${d.data.item}:` + `${d.data.count}`);
    // })
    // .on("mousemove", (e, d) => {
    //   tooldiv
    //     .style("top", e.pageY - 50 + "px")
    //     .style("left", e.pageX - 50 + "px");
    // })
    // .on("mouseout", () => {
    //   tooldiv.style("visibility", "hidden");
    // });
  });

  return (
    <div id="chartArea">
      <svg ref={pieChart}></svg>
    </div>
  );
};

export default Pie;
