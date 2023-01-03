import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { tip as d3tip } from "d3-v6-tip";
import Filter from "../Filter/Filter";
import "./Pie.scss";

const Pie = ({ transformData, height, width, piefor }) => {
  const svgRef = useRef();
  const [filter, setFilter] = useState("end_year");
  useEffect(() => {
    //drawing Pie chart
    const drawPie = (data) => {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      svg.selectAll("g").remove();

      const mainCanvas = svg.append("g");
      // .attr("transform", `translate(${width / 2},${height / 2})`)
      // .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      //Create Pie
      const pie = d3
        .pie()
        .sort(null)
        .value((data) => data.value);

      // arcRadius
      const arcPath = d3
        .arc()
        .outerRadius(width / 2)
        .innerRadius(piefor === "relevance" ? width / 3 : 0);

      //Defining Colors
      const colors = d3.scaleOrdinal([
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

      const tooltip = d3tip()
        .attr("class", "d3-tip")
        .offset([10, -10])
        .direction("e")
        .html((d) => {
          // console.log(d.target.__data__.data);
          return `<div>Total : ${d.target.__data__.data.value}</div>
        <div>${filter} : ${d.target.__data__.data.item}</div>
        
        `;
        });
      mainCanvas.call(tooltip);

      //TWEEN ANIMATION
      const arcAnimation = (d) => {
        const i = d3.interpolate(d.endAngle, d.startAngle);

        return function (t) {
          d.startAngle = i(t);
          return arcPath(d);
        };
      };
      const angles = pie(data);

      colors.domain(data.map((d) => d.value));

      const paths = mainCanvas.selectAll("path").data(angles);

      paths
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("stroke", "white")
        .attr("fill", (d) => colors(d.data.value))
        .attr("d", arcPath)
        .on("mouseover", tooltip.show)
        .on("mouseout", tooltip.hide)
        .transition()
        .duration(1000)
        .attrTween("d", arcAnimation);
    };

    const tdata = d3
      .groups(transformData, (d) => d[filter])
      .map(([name, group]) => ({
        item: name ? name : "UnCategorised",
        value: d3.sum(group, (d) => d[piefor]),
      }));

    drawPie(tdata);

    return () => {
      // d3.select("svg").remove();
    };
  }, [transformData, filter]);

  const onFilterHandler = (props) => {
    setFilter(props);
  };

  return (
    <div className="pie">
      <Filter onFilter={onFilterHandler} />
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Pie;
