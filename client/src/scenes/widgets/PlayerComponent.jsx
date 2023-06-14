import ReactPlayer from 'react-player';
import React, { useRef } from 'react';

function PlayerComponent ( {vid} ) {
   const playerRef = useRef(null);
   return (
      <div>
         <ReactPlayer ref={playerRef} url={vid} controls={true} />
      </div>
   )
};
export default PlayerComponent;