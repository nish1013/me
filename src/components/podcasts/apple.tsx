import React from 'react';
import { Link } from 'gatsby';
import './styles.css';

export default function Apple() {
  return (
    <div className="flex flex-col items-center py-2 mx-10">
      <a
        href="https://podcasts.apple.com/us/podcast/embarking-on-a-journey-from-javascript-to-typescript/id1732927029?itsct=podcast_box_badge&itscg=30200&ls=1"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          borderRadius: '13px',
          width: '250px',
          height: '83px',
        }}
      >
        <img
          src="https://tools.applemediaservices.com/api/badges/listen-on-apple-podcasts/badge/en-us?size=250x83&releaseDate=1708886880"
          alt="Listen on Apple Podcasts"
          style={{
            borderRadius: '13px',
            width: '250px',
            height: '83px',
          }}
        />
      </a>
    </div>
  );
}
