import { combineReducers } from "redux";

import { auth } from "./auth";
import api from "./api";
import notify from "./notifications"

export default combineReducers({
  auth,
  api,
  notify
});
