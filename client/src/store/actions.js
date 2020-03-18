// Actions are asynchronous methods that commit mutations
export default {
  addUserData: ({ commit }, userInfo) => {
    commit("loggedUserData", userInfo);
  }
};
