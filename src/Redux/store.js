import { createStore } from "redux";

const initialState = {
  user: { name: "Igor" },
  chatData: [],
  isLoaded: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CHAT_DATA":
      return {
        ...state,
        chatData: action.data,
        isLoaded: action.isLoaded
      };
    case "SET_NEW_MESSAGE":
      return {
        ...state,
        chatData: [...state.chatData, action.newMessage]
      };
    case "LIKED_MESSAGE":
      let index = state.chatData.findIndex(user => {
        return user.id === action.userId;
      });
      let data = [...state.chatData];
      if (data[index].liked) {
        data[index].liked = false;
      } else {
        data[index].liked = true;
      }
      return {
        ...state,
        chatData: data
      };
    case "REMOVE_MESSAGE":
      return {
        ...state,
        chatData: state.chatData.filter(message => {
          console.log();
          return message.id !== action.removedId;
        })
      };
    case "LOADED-DATA":
      let toggleLoad = action.loaded ? false : true;
      return {
        ...state,
        isLoaded: toggleLoad
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
