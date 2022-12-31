import React, { useEffect, useRef, useState } from "react";
import "./StackedAreaChart.scss";
import * as d3 from "d3";
import { axisLeft, axisTop } from "d3";
import tip from "d3-tip";
import { tip as d3tip } from "d3-v6-tip";

const StackedAreaChart = () => {
  const svgRef = useRef();

  // Fake data
  const [i, setI] = useState(0);
  const [data, setData] = useState([
    {
      year: 7,
      aData: 50,
      bData: 300,
      cData: 456,
    },
    {
      year: 8,
      aData: 150,
      bData: 50,
      cData: 250,
    },
    {
      year: 9,
      aData: 200,
      bData: 100,
      cData: 156,
    },
    {
      year: 10,
      aData: 130,
      bData: 50,
      cData: 56,
    },
    {
      year: 11,
      aData: 240,
      bData: 80,
      cData: 576,
    },
    {
      year: 12,
      aData: 380,
      bData: 10,
      cData: 356,
    },
    {
      year: 13,
      aData: 140,
      bData: 144,
      cData: 246,
    },
  ]);
  const width = 1200;
  const height = 500;
  const ticks = 8;

  useEffect(() => {
    console.log("shuffled");
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
    svg.selectAll("path").remove();

    //! MAIN PART STACKING !//
    //* https://medium.com/@louisemoxy/how-to-create-a-stacked-area-chart-with-d3-28a2fee0b8ca
    //* https://github.com/d3/d3-shape#stack
    //* https://d3-graph-gallery.com/graph/area_basic.html

    const stack = d3.stack().keys(["aData", "bData", "cData"]);
    // .order(d3.stackOrderNone);
    // .offset(d3.stackOrderNone);

    const stackValue = stack(data);
    // console.log(stackValue);

    const stackData = [];

    stackValue.forEach((layer, index) => {
      const currentStack = [];
      layer.forEach((d, i) => {
        currentStack.push({
          value: d,
          year: data[i].year,
        });
      });
      stackData.push(currentStack);
    });
    console.log(stackData);

    //! -------------------!//

    //X Scale
    const xScale = d3.scaleLinear().domain([7, 13]).range([0, width]);
    // X Axis
    const xAxis = d3.axisBottom(xScale).ticks(data.length - 1);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

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
      .domain([0, 1])
      .range(["#5c497e", "#7c6d97", "#e0cefe"]);

    const area = d3
      .area()
      .x((d) => xScale(d.year))
      .y0((d) => yScale(d.value[0]))
      .y1((d) => yScale(d.value[1]));

    console.log(area(stackData[0]));

    // Show the areas
    svg
      .selectAll(".les")
      .data(stackData)
      .join("path")
      .style("fill", (d, i) => color(i))
      //   .attr("stroke", "white")
      .attr("class", (d, i) => `arrow${i}`)
      .transition(d3.transition().duration(2000))
      .attr("d", area);
  }, [data[0].year]);
  return (
    <div className="stackedArea">
      <button
        onClick={() => {
          setData([
            {
              year: 14,
              aData: 760,
              bData: 600,
              cData: 946,
            },
            {
              year: 8,
              aData: 150,
              bData: 50,
              cData: 100,
            },
            {
              year: 9,
              aData: 200,
              bData: 100,
              cData: 156,
            },
            {
              year: 10,
              aData: 130,
              bData: 50,
              cData: 56,
            },
            {
              year: 11,
              aData: 240,
              bData: 80,
              cData: 576,
            },
            {
              year: 12,
              aData: 380,
              bData: 10,
              cData: 356,
            },
            {
              year: 13,
              aData: 420,
              bData: 200,
              cData: 246,
            },
          ]);
          console.log(data);
        }}
      >
        Randomize
      </button>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        <g className="x-axis-grid"></g>
        <g className="y-axis-grid"></g>
      </svg>
    </div>
  );
};

export default StackedAreaChart;
