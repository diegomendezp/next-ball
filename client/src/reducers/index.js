import { combineReducers } from "redux";

import { auth } from "./auth";
import api from "./api";

export default combineReducers({
  auth,
  api
});
