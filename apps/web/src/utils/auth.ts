const TOKEN_KEY = "accessToken";

export const auth = {
  login(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};