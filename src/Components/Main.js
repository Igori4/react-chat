import React from "react";
import MessageInput from "./MessageInput";
import heartIconFill from "../image/heart-icon-fill.png";
import heartIcon from "../image/heart-icon.png";
import { connect } from "react-redux";
import Preloader from "./Preloader";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.props.isLoaded(true)
  }

  render() {
    const { chatData, liked, removeMessage, isLoaded } = this.props;
    return (
      <main className="main">
        <div className="chat">
          <ul className="chat_list">
            {chatData.map(message => {
              return (
                <li
                  className={
                    message.user === "Igor" ? "self_user" : "chat_message"
                  }
                  key={message.id}
                >
                  <div className="user_avatar">
                    <img className="avatar" src={message.avatar} />
                  </div>
                  <div className="user_info">
                    <h3 className="user_name">{message.user}</h3>
                    <p className="user_message">{message.message}</p>
                  </div>
                  <div className="addition_info">
                    <span className="time_message">{message.created_at}</span>
                    <img
                      className="heart_like"
                      src={message.liked ? heartIconFill : heartIcon}
                      height="20"
                      width="20"
                      title="like"
                      alt="like icon"
                      onClick={() => {
                        liked(message.id);
                      }}
                    />
                    <button
                      onClick={() => {
                        removeMessage(message.id);
                      }}
                      className="remove_message"
                      title="close"
                    >
                      X
                    </button>
                  </div>
                </li>
              );
            })}
            <li
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></li>
          </ul>
          {isLoaded ? null : <Preloader />}
          <MessageInput />
        </div>
      </main>
    );
  }
}

const mapState = state => {
  return {
    chatData: state.chatData,
    isLoaded: state.isLoaded
  };
};

const mapDispatch = dispatch => {
  return {
    liked: userId => dispatch({ type: "LIKED_MESSAGE", userId }),
    removeMessage: removedId => dispatch({ type: "REMOVE_MESSAGE", removedId }),
    isLoaded: loaded => dispatch({type:"LOADED-DATA", loaded})
  };
};

export default connect(
  mapState,
  mapDispatch
)(Main);
