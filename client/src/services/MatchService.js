import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/matches`,
  withCredentials: true
});

class MatchService {
  static errorHandler(e) {
    console.error("Match API ERROR");
    console.error(e);
    throw e;
  }

  static getMatches = () => {
    return instance
      .get("/")
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static newMatch = match => {
    return instance
      .post("/new", match)
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static getRecord = id => {
    return instance
      .get(`/record/${id}`)
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static getMyMatches = () => {
    return instance
      .get(`/my-matches`)
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static addPlayer = (playerId, matchId) => {
    return instance
      .post(`/addPlayer/${playerId}/${matchId}`, {})
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static deleteMatch = id => {
    return instance
      .delete(`/${id}`)
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static finishMatch = (match, winner, loser) => {
    return instance
      .post(`/endMatch/${match}`, { winner, loser })
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  };

  static setWinner(id) {
    return instance
      .post(`/winnerEndMatch`, { winner: id })
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  }

  static setLoser(id) {
    return instance
      .post(`/loserEndMatch`, { loser: id })
      .then(response => response.data)
      .catch(MatchService.errorHandler);
  }
}

export default MatchService;
