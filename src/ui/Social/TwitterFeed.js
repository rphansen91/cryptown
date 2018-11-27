import React from "react"
import { LoadScript } from "./loadScript";

export default ({ username }) => (
    <LoadScript src="https://platform.twitter.com/widgets.js">
        <a className="twitter-timeline" href={`https://twitter.com/${username}`}></a>
    </LoadScript>
)