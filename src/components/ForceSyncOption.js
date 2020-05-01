import React, {useState} from 'react';

import './ForceSyncOption.scss';

const SYNC_TYPES = Object.freeze({
  OFF: 'OFF',
  AUTO: 'AUTO',
  ALWAYS: "ALWAYS",
});

const INFO_TEXT = {
  OFF: "only vote - don't listen",
  AUTO: "pause when site is closed - play when site is opened",
  ALWAYS: "always stay synchronized",
};

const ForceSyncOption = () => {
  const [state, setState] = useState(SYNC_TYPES.AUTO);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="ForceSyncOption">
      synchronize option
      <select value={state} onChange={handleChange}>
        <option value={SYNC_TYPES.OFF}>off</option>
        <option value={SYNC_TYPES.AUTO}>auto</option>
        <option value={SYNC_TYPES.ALWAYS}>always</option>
      </select>
      <div className="ForceSyncOption__info">
        {INFO_TEXT[state]}
      </div>
    </div>
  )
};

export default ForceSyncOption;
