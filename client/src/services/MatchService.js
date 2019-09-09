import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api/matches",
  withCredentials: true
});

class MatchService {
  static errorHandler(e) {
    console.error("Match API ERROR");
    console.error(e);
    throw e;
  }

  static getMatches = () => {
    return instance.get("/").then(response => response.data)
    .catch(MatchService.errorHandler)
  };

}

export default MatchService;