import React from "react";

export default ({ content, sidebar }) => (
  <div className="row">
    <div className="col-md-9 pr-0">{content}</div>
    <div className="col-md-3 border-left pl-0">{sidebar}</div>
  </div>
);
