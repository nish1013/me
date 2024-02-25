import React from "react"
import { Link } from "gatsby"
import "./styles.css"

export default function Spotify() {
    return (<div className="flex flex-col items-center py-2 mx-10">
        <iframe
            src="https://podcasters.spotify.com/pod/show/nish76/embed"
            height="102px"
            width="400px"
            frameBorder="0"
            scrolling="no"
        ></iframe>
    </div>)
}