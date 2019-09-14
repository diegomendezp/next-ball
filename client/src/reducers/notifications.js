const initialStore = {
  notifications: null
};

const notify = (state = initialStore, action) => {
  switch (action.type) {
    case "GETNOTIFICATION":
      console.log('Inside')
      const { notification } = action;
      return {
        ...state,
        notifications: { ...state.notifications, notification:notification}
      };
    default:
      return state;
  }
};

export default notify;