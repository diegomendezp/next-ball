import io from "socket.io-client";
import MatchService from "./services/MatchService";
import { getMatches } from "./actions";

export class WebsocketConnection {
  constructor(store) {
    this.store = store;
    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.socket.on(`new-match`, () => {
      MatchService.getMatches().then(matches => {
        this.store.dispatch(getMatches(matches));
      });
    });
    // this.socket.on("matches", data => {
    //   // Actually push the message when arrives
    //   this.sessionService.matches = data;
    // });
  }

  sendMatch() {
    this.socket.emit("new-match");
  }
}
