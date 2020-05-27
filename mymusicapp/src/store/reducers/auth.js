import {
  RECIEVE_USER,
  START_FETCH_USER,
  LOGGED_IN,
  LOGGED_OUT,
} from "../actions/auth";

const initialState = {
  isSignedIn: false,
  user: null,
  isFetching: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH_USER:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_USER:
      console.log(action);
      if (action.res && action.res.signin) {
        return Object.assign({}, state, {
          isSignedIn: true,
          user: action.res.user,
          isFetching: false,
        });
      } else return Object.assign({}, state, { isFetching: false });
    case LOGGED_IN:
      console.log(action.res);
      return Object.assign({}, state, {
        isFetching: false,
        isSignedIn: true,
        user: action.res.data.user,
      });
    case LOGGED_OUT:
      console.log("logged out//");
      return Object.assign({}, state, {
        isFetching: false,
        isSignedIn: false,
        user: null,
      });
    default:
      return state;
  }
};
