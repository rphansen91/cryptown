import React from "react"
import { LoadScript } from "./loadScript";

export default ({ username }) => (
    <LoadScript src="https://platform.twitter.com/widgets.js">
        <a href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`} className="twitter-follow-button" data-show-count="false">Follow @{username}</a>
    </LoadScript>
)