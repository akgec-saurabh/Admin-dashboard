import React from "react";
import "./Loading.scss";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type={"spin"} />
    </div>
  );
};

export default Loading;
