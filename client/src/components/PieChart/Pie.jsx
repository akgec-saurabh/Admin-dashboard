import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import tip from "d3-tip";
import { tip as d3tip } from "d3-v6-tip";

const Pie = ({ data, height, width }) => {
  const svgRef = useRef();

  useEffect(() => {
    console.log("adding svg");

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

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
      .innerRadius(width / 3);

    //Defining Colors
    const colors = d3.scaleOrdinal([
      "#ffa822",
      "#134e6f",
      "#ff6150",
      "#1ac0c6",
      "#dee0e6",
    ]);

    console.log(tip);

    const tooltip = d3tip()
      .attr("class", "d3-tip")
      .offset([10, -10])
      .direction("e")
      .html((d) => {
        // console.log(d.target.__data__.data);
        return `<div>Value ${d.target.__data__.data.value}</div>
        <div>Item ${d.target.__data__.data.item}</div>
        
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

    //drawing Pie chart
    const drawPie = (data) => {
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

    drawPie(data);

    return () => {
      console.log("removing svg");
      d3.select("svg").remove();
    };
  }, [data]);

  return <svg className="canva" ref={svgRef}></svg>;
};

export default Pie;
