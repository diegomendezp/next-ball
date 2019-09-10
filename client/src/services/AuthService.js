import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api/auth",
  withCredentials: true
});

class AuthService {
  static errorHandler(e) {
    console.error("AUTH API ERROR");
    console.error(e);
    throw e;
  }

  static signup = user => {
    return instance.post("/register", user).then(response => response.data)
    .catch(AuthService.errorHandler)
  };

  static login = user => {
    return instance.post("/authenticate", user).then(response => response.data)
    .catch(AuthService.errorHandler)
  };

  static currentUser = () => {
    return instance.get("/profile").then(response => response.data)
    .catch(AuthService.errorHandler)
  };

  static logout = () => {
    return instance.get("/logout").then(response => response.data)
    .catch(AuthService.errorHandler)
  };

  static getUsers = () => {
    return instance.get("/users").then(response => response.data)
    .catch(AuthService.errorHandler)
  };
}

export default AuthService;
