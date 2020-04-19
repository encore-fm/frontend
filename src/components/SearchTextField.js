import React from "react";

import './SearchTextField.scss';
import IconClose from "./icons/IconClose";

const SearchTextField = ({onChange, value, onClose}) => {
  return (
    <div className="SongSearchTextField">
      <input
        className="SongSearchTextField_input"
        placeholder="search..."
        value={value}
        onChange={onChange}
      />
      <IconClose onClick={onClose}/>
    </div>
  )
};

export default SearchTextField;
