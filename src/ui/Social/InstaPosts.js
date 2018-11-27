import React from "react"
import { LoadScript } from "./loadScript";

export default ({ width="300px", link, username }) => (
    <LoadScript src={`https://instawidget.net/js/instawidget.js?u=${link}&width=${width}`}>
        <a href={`https://instawidget.net/v/user/${username}`} id={`link-${link}`}></a>
    </LoadScript>
)