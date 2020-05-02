import React, {useEffect, useState} from 'react';

import './ForceSyncOption.scss';

export const SYNC_OPTIONS = Object.freeze({
  FORCE_SYNC: 'FORCE_SYNC',
  AUTO: 'AUTO',
  FORCE_DESYNC: 'FORCE_DESYNC',
});

const INFO_TEXT = {
  FORCE_DESYNC: "only vote - don't listen",
  AUTO: "pause when site is closed - play when site is opened",
  FORCE_SYNC: "always stay synchronized",
};

const ForceSyncOption = ({syncMode, handleChange}) => {
  const [state, setState] = useState(SYNC_OPTIONS.AUTO);

  useEffect(() => {
    setState(syncMode);
  }, [syncMode]);

  const handleSyncModeChange = (e) => {
    const syncMode = e.target.value;
    setState(syncMode);
    handleChange(syncMode);
  };

  return (
    <div className="ForceSyncOption">
      synchronize option
      <select value={state} onChange={handleSyncModeChange}>
        <option value={SYNC_OPTIONS.FORCE_DESYNC}>off</option>
        <option value={SYNC_OPTIONS.AUTO}>auto</option>
        <option value={SYNC_OPTIONS.FORCE_SYNC}>always</option>
      </select>
      <div className="ForceSyncOption__info">
        {INFO_TEXT[state]}
      </div>
    </div>
  )
};

export default ForceSyncOption;
