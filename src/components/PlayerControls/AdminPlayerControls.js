import React, {useState} from "react";

import './PlayerControls.scss';
import IconPause from '../icons/IconPause';
import IconPlay from '../icons/IconPlay';

const AdminPlayerControls = ({isPlaying, handlePlayPause, handleSkip}) => {

  // internal state to make play pause buttons feel more responsive
  const [internalPlaying, setInternalPlaying] = useState(isPlaying);

  const handlePlay = () => {
    handlePlayPause(true);
    setInternalPlaying(true);
  };

  const handlePause = () => {
    handlePlayPause(false);
    setInternalPlaying(false);
  };

  return (
    <div className="PlayerControls AdminControls">
      <div className="PlayerControls__skip" onClick={handleSkip}>skip</div>
      {internalPlaying ? <IconPause onClick={handlePause}/> : <IconPlay onClick={handlePlay}/>}
    </div>
  )
};

export default AdminPlayerControls;
