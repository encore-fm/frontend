import React from "react";

import './UserListElement.scss';

const UserListElement = ({user}) => {
  const {username, isAdmin, score, isSynchronized} = user;

  return (
    <div className="UserListElement">
      <div className="UserListElement_username">
        <span className="highlight">{username}</span> {isAdmin ? <span className="host">host</span> : ''}
      </div>
      <div className="UserListElement_score">{score}</div>
    </div>
  )
};

export default UserListElement;
