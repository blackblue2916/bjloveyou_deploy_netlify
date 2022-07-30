import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

function AudioPlayer({ img, song, nextsong }) {
  return (
    <div className="c-player">
      <audio></audio>
      <p>playing now: {song.title}</p>
      <button className="skip-btn">
        <FastRewindIcon />
      </button>

      <button className="play-btn">
        <PlayArrowIcon />
      </button>

      <button className="skip-btn">
        <FastForwardIcon />
      </button>
      <p>
        <strong>Next up </strong>
        music: {nextsong.title}
      </p>
    </div>
  );
}

export default AudioPlayer;
