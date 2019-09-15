
import React from "react";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { login, logout} from "./actions";
import AuthService from "./services/AuthService";
import { loadState, saveState } from './localStorage'
import { ThemeProvider } from '@material-ui/styles';
import { ThemeStore } from './theme';
import { WebsocketConnection } from "./websockets";

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

AuthService.currentUser().then(user => {
  if(user.error){

  } else {
    store.dispatch(login(user));
  }
  
}).catch(e =>store.dispatch(logout()));

store.subscribe(() => {
  saveState(store.getState())
})

export const wsConn = new WebsocketConnection(store);

render(
  <Provider store={store}>
    <ThemeStore>
    <Router>
      <App />
    </Router>
    </ThemeStore>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();