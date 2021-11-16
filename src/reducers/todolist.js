const initialState = {
    loading: false,
    taskId: null,
    todos: [],
  };
  
  const todolistReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_GET_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_TODOS":
        return {
          ...state,
          todos: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default todolistReducer;
  