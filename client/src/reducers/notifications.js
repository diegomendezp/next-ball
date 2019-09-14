const initialStore = {
  notifications: null
};

const notify = (state = initialStore, action) => {
  switch (action.type) {
    case "GETNOTIFICATION":
      const { notification } = action;
      return {
        ...state,
        notifications: { ...state.notifications, notification}
      };
    default:
      return state;
  }
};

export default notify;