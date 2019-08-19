import React, { useEffect } from "react";

function addScript(src, onload, onerror) {
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
  script.onload = onload;
  script.onerror = onerror;
}

export default () => {
  useEffect(() => {
    try {
      window.addthis.layers.refresh();
    } catch (e) {}
  }, []);
  return <div />;
};
