import React from "react";
import Typography from "@material-ui/core/Typography";
import SEO from "../SEO";

const Success = ({ onChange = v => v }) => (
  <div>
    <SEO title={"Success | Hodl Stream"} path={"/success"} />
    <section />
    <section>
      <div className="container">
        <Typography variant="h4" color="textPrimary">
          Payment Success
        </Typography>
      </div>
    </section>
  </div>
);

export default Success;
