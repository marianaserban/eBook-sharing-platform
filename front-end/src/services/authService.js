import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userName, email, password, firstName,lastName) {
    return axios.post(API_URL + "signup", {
      userName,
      email,
      password,
      firstName,
      lastName
    });
  }
}

export default new AuthService();