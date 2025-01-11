import React from 'react';

interface SpotifyItemProps {
  url: string;
}

const SpotifyItem = ({ url }: SpotifyItemProps) => {
  return (
    <div className="my-2">
      <iframe
        src={url}
        height="102px"
        width="400px"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default SpotifyItem;
