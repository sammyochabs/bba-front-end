const initialState = {
  sidebarShow: "responsive",
  asideShow: false,
  darkMode: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default changeState;
