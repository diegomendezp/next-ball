import io from "socket.io-client";
import MatchService from "./services/MatchService";
import { getMatches, getNotification } from "./actions";

export class WebsocketConnection {
  constructor(store) {
    this.store = store;
    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.socket.on(`new-match`, () => {
      MatchService.getMatches().then(matches => {
        this.store.dispatch(getMatches(matches));
      });
    });
    this.socket.on(`delete-match`, () => {
      MatchService.getMatches().then(matches => {
        this.store.dispatch(getMatches(matches));
      });
    });
    
    
  }

  activateNotifications(user){
    this.socket.on(`${user.id}`, data => {
      this.store.dispatch(getNotification(data))
    });
  }

  sendMatch() {
    this.socket.emit("new-match");
  }

  eventMatch() {
    this.socket.emit("delete-match");
  }

  sendChallange( player, otherPlayerId, matchId, type) {
    const { id, username, league } = player;
    this.socket.emit("notify", {
      type,
      otherPlayerId,
      id,
      matchId,
      username,
      league
    });
  }
}
