import React from "react";

const UserListElement = ({user}) => {
  const {username, isAdmin, score, isSynchronized} = user;

  return (
    <div className="UserListElement">
      {username}
    </div>
  )
};

export default UserListElement;
