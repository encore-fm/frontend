import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchUserList} from "../actions/userList";
import UserListElement from "../components/UserListElement";

const UserList = (props) => {
  const {user, userList, error} = props;

  useEffect(() => {
    props.dispatch(fetchUserList(user))
  }, []);

  return (
    <div className="UserList">
      {userList && userList.map((el, i) => <UserListElement user={el} key={i} /> )}
    </div>
  )

};

export default connect(state => ({
  user: state.user,
  error: state.error,
  userList: state.userList,
}))(UserList);
