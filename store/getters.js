export default {
  isLoggedIn(state) {
    return state.user !== null;
  },

  user(state) {
    return state.user;
  }
}
