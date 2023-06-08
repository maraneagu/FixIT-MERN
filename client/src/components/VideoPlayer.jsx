import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoPath }) => {
  return (
    <div>
      <ReactPlayer url = {videoPath} />
    </div>
  );
};

export default VideoPlayer;