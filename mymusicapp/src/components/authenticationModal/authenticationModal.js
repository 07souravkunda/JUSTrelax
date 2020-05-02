import React from "react";
import FacebookLogin from "react-facebook-login";
import Styles from "./authenticationModal.module.css";
import GoogleLogin from "react-google-login";
import { loginUser } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const AuthenticationModal = (props) => {
  const dispatch = useDispatch();

  const responseFacebook = async (res) => {
    dispatch(loginUser({ method: "facebook", ...res }));
    history.push("/");
  };
  const componentClicked = () => {};
  const responseGoogle = async (res) => {
    dispatch(loginUser({ method: "google", accessToken: res.tokenId }));
    history.push("/");
  };

  return (
    <div className={Styles.authenticationModal}>
      <div className={Styles.head}>INDIA'S NO. 1 MUSIC APP</div>
      <div className={Styles.para}>
        Over 10 songs to refresh your mood according to occasion
      </div>
      <div className={Styles.buttons}>
        <GoogleLogin
          clientId="746316035805-sdvj15sq8jhdkgpnitppokg5jpg3dj66.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className={Styles.google}
        />
        <FacebookLogin
          appId="1286403248226420"
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </div>
    </div>
  );
};

export default AuthenticationModal;
