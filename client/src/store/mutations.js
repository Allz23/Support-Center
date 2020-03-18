//  Mutations are synchronous methods that mutate (change) the state
export default {
  loggedUserData: (state, userInfo) => {
    state.user = userInfo;
  }
};
