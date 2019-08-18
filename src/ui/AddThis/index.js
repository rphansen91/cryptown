import React, { useEffect } from "react";

function addScript(src, onload, onerror) {
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
  script.onload = onload;
  script.onerror = onerror;
}

export default () => {
  useEffect(
    () =>
      addScript(
        "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-555b3dd213990409",
        () => {
          try {
            window.addthis.layers.refresh();
          } catch (e) {}
        }
      ),
    []
  );
  return <div />;
};
