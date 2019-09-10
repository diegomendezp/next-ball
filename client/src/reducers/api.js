const initialStore = {
  data: null
};

const api = (state = initialStore, action) => {
  switch (action.type) {
    case "GETUSERS":
      const { users } = action;
      return {
        ...state,
        data: { ...state.data, users }
      };
    case "GETMATCHES":
      const { matches } = action;
      return {
        ...state,
        data: { ...state.data, matches }
      };
    case "GETINFO":
      return {
        ...state,
        data: { ...state.data, users: action.users, matches:action.matches }
      };
    default:
      return state;
  }
};

export default api;