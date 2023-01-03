import React from "react";
import "./Filter.scss";

const Filter = ({ onFilter }) => {
  const options = [
    "End Year",
    "Topics",
    "Pestle",
    "Sector",
    "Region",
    "Country",
  ];
  const filterChangeHandler = (e) => {
    if (e.target.value == "End Year") {
      onFilter("end_year");
    } else if (e.target.value == "Topics") {
      onFilter("topic");
    } else {
      onFilter(e.target.value.toLowerCase());
    }
  };
  return (
    <div className="filter">
      <select onChange={filterChangeHandler} name="filter" id="filter">
        {options.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
