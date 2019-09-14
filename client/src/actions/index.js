export const login = user => {
  return {
    type: "LOGIN",
    user
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const getUsers = users => {
  return {
    type: "GETUSERS",
    users
  };
};

export const getMatches = matches => {
  return {
    type: "GETMATCHES",
    matches
  };
};


export const getInfo = (users, matches) => {
  return {
    type: "GETINFO",
    users,
    matches,
  };
};

export const getNotification = (notification) => {
  return {
    type: "GETNOTIFICATION",
    notification
  };
};