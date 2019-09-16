import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/auth`,
  withCredentials: true
});

class AuthService {
  static errorHandler(e) {
    return ({ error:e })
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

  static valorate = (statistics, userId) => {
    return instance.post(`/valorate/${userId}`, statistics).then(response => response.data)
    .catch(AuthService.errorHandler)
  };

  static updateProfile = (user) => {
    const data = new FormData();
    Object.keys(user).forEach(prop => {
      if (prop === 'password' && user.password === '') return;
      data.append(prop, user[prop])
    });
    return instance.put('/edit-profile', data)
    .then(response => response.data)
  }
}

export default AuthService;
