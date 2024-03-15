import React from "react";
import SpotifyItem from "./spotify-item";

export default function Spotify() {
    return (
        <div className="flex flex-col items-center py-2 mx-10">
            <SpotifyItem url="https://podcasters.spotify.com/pod/show/nish76/embed" />
            <SpotifyItem url="https://podcasters.spotify.com/pod/show/nishan-satharasinghe/embed" />
        </div>
    );
}
