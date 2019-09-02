import React from "react";
import { connect } from "react-redux";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue: ""
    };
  }

  hendleInputMessage = event => {
    this.setState({ tempValue: event.target.value });
  };

  render() {
    const { hendleSubmit, userName } = this.props;
    const { tempValue } = this.state;
    return (
      <form
        className="form"
        onSubmit={event => {
          event.preventDefault();
          hendleSubmit({
            user: userName,
            id: tempValue + Math.random(),
            message: tempValue,
            liked: false,
            avatar: "https://i.pravatar.cc/300?img=7",
            created_at: new Date()
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "")
          });
          this.setState({ tempValue: "" });
        }}
      >
        <input
          onChange={event => {
            this.hendleInputMessage(event);
          }}
          value={tempValue}
          type="text"
          className="message_input"
          noValidate
        />
        <button
          type="button"
          className="send_button"
          onClick={event => {
            event.preventDefault();
            hendleSubmit({
              user: userName,
              id: tempValue + Math.random(),
              message: tempValue,
              liked: false,
              avatar: "https://i.pravatar.cc/300?img=7",
              created_at: new Date()
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "")
            });
            this.setState({ tempValue: "" });
          }}
        >
          Send
        </button>
      </form>
    );
  }
}

const mapState = state => {
  return {
    userName: state.user.name
  };
};

const mapDispatch = dispatch => {
  return {
    hendleSubmit: newMessage =>
      dispatch({ type: "SET_NEW_MESSAGE", newMessage })
  };
};

export default connect(
  mapState,
  mapDispatch
)(MessageInput);
