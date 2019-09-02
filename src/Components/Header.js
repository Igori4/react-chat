import React from "react";
import { connect } from "react-redux";

const Header = props => {
  const { chatData } = props;
  return (
    <header className="header">
      <h1 className="main__title">My Chat</h1>
      <div className="simple__info">
        <span className="users_amount">
          {
            chatData
              .map(item => item.user)
              .filter((value, index, self) => self.indexOf(value) === index)
              .length
          }{" "}
          users
        </span>
        <span className="messages__amount"> {chatData.length} messages</span>
      </div>
      <div className="last_message_info">
        <span>
          last message:{' '}
          {chatData.length > 0
            ? chatData[chatData.length - 1]["created_at"]
            : null}
        </span>
      </div>
    </header>
  );
};

const mapState = state => {
  return {
    chatData: state.chatData
  };
};

export default connect(
  mapState,
  null
)(Header);

// users: action.data.filter((user, i, users) => !users.includes(user)).length
