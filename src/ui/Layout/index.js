import React from "react";

export default ({ content, sidebar }) => (
  <div className="row">
    <div className="col-md-9 main-content">{content}</div>
    <div className="col-md-3 sidebar-content border-left">{sidebar}</div>
  </div>
);
