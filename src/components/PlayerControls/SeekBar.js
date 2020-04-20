import React, {useEffect, useState} from "react";

import "./SeekBar.scss"

const SeekBar = ({modify, duration, progress, timestamp, handleSeek}) => {
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const timeout = 50;
  const seekBarID = 'seekbar';

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(Date.now()), timeout);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (event) => {
    if (!modify) return;
    const posX = event.nativeEvent.offsetX;
    const boundingBox = document.getElementById(seekBarID).getBoundingClientRect();
    const ratio = (posX - boundingBox.x) / boundingBox.width;

    handleSeek(ratio * duration);
  };

  const timeSinceUpdate = lastUpdated - Date.parse(timestamp);
  const styles = {
    width: `${(progress + timeSinceUpdate)  / duration * 100}%`,
    transition: 'width',
    transitionDuration: `${timeout}ms`,
    transitionTimingFunction: 'linear',
  };

  return (
    <div className="SeekBar" onMouseDown={handleMouseDown} id={seekBarID}>
      <span style={styles}/>
    </div>
  )
};

export default SeekBar;
