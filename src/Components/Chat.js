import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class Chat extends React.Component {
    constructor(props) {
        super(props)
    }
  async componentDidMount() {
    let response = await fetch("https://api.dev.buki.com.ua/frontend_test");
    let data = await response.json();
    let chatData = data.map(user => ({...user, liked:false}))

    this.props.getChatData(chatData);
    console.log(chatData)
  }

  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getChatData: data => dispatch({ type: "GET_CHAT_DATA", data })
  };
};

export default connect(
  null,
  mapDispatch
)(Chat);
