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

    
    
  }

  activateNotifications(user){
    this.socket.on(`${user.id}`, data => {
      if (data.type == "challenge") {
        console.log(data);
      }else if(data.type == "success"){
      } else if (data.type =="error"){
      } else {
      }
    });
  }

  sendMatch() {
    this.socket.emit("new-match");
  }

  sendChallange( player, otherPlayerId, matchId, type) {
    const { id, username, league } = player;
    console.log(`Sending notify to -> ${otherPlayerId}`);
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
