import ReactPlayer from 'react-player';
import React, { useRef } from 'react';

function PlayerComponent({ vid }) {
   const playerRef = useRef(null); // Create a ref to hold the player component reference

   return (
      <div>
         <ReactPlayer
            ref={playerRef} // Assign the playerRef to the ref prop of ReactPlayer
            url={vid} // Specify the video URL to play
            controls={true} // Enable video controls
            style={{ position: 'absolute', top: 0, left: 0 }} // Apply CSS styles to position the player
            width="100%" // Set the player's width to 100% of its container
            height="100%" // Set the player's height to 100% of its container
         />
      </div>
   );
}

export default PlayerComponent;
