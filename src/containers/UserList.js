import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchUserList} from "../actions/userList";
import UserListElement from "../components/UserListElement";

import './UserList.scss';

const UserList = (props) => {
  const {user, userList, error} = props;

  useEffect(() => {
    props.dispatch(fetchUserList(user))
  }, []);

  return (
    <div className="UserList">
      <div className="UserList__col">
        <h3>listening</h3>
        {userList && userList.filter(u => u.isSynchronized === true).map((el, i) => <UserListElement user={el} key={i} /> )}
      </div>

      <div className="UserList__col">
        <h3>not listening</h3>
        {userList && userList.filter(u => u.isSynchronized === false).map((el, i) => <UserListElement user={el} key={i} /> )}
      </div>
    </div>
  )

};

export default connect(state => ({
  user: state.user,
  error: state.error,
  userList: state.userList,
}))(UserList);
