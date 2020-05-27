import {
  getUserDetails,
  loginUserUtil,
  logoutUserUtil,
} from "../utilMethods/methods";
export const START_FETCH_USER = "FETCH_USER";
export const FETCH_USER = "FETCH_USER";
export const RECIEVE_USER = "RECIEVE_USER";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";

export const startFetchUser = () => {
  return {
    type: FETCH_USER,
  };
};

export const recieveUser = (res) => {
  return {
    type: RECIEVE_USER,
    res,
  };
};

export const loggedIn = (res) => {
  return {
    type: LOGGED_IN,
    res,
  };
};

export const loggedOut = () => {
  return {
    type: LOGGED_OUT,
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(startFetchUser());
    getUserDetails()
      .then(
        (res) => res.data,
        (err) => {
          console.log(err);
        }
      )
      .then((res) => dispatch(recieveUser(res)));
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    dispatch(startFetchUser());
    loginUserUtil(data)
      .then(
        (res) => res,
        (err) => console.log(err)
      )
      .then((res) => dispatch(loggedIn(res)));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(startFetchUser());
    logoutUserUtil()
      .then((res) => res)
      .then(dispatch(loggedOut()));
  };
};
