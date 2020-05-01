import React, {useState} from 'react';

import './ForceSyncOption.scss';

const ForceSyncOption = () => {
  const [state, setState] = useState(false);

  const handleChange = (e) => {
    setState(e.target.checked);
  };

  return (
    <div className="ForceSyncOption">
      always stay synchronized <input type="checkbox" checked={state} onChange={handleChange}/>
    </div>
  )
};

export default ForceSyncOption;
