import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import SongContainer from "./container/songContainer/songContainer";
import AuthenticationModal from "./components/authenticationModal/authenticationModal";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/actions/auth";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  let el;
  if (auth.isFetching) {
    el = <Spinner />;
  } else if (!auth.isSignedIn) {
    el = (
      <Layout>
        <Switch>
          <Route
            path="/authentication"
            component={() => (
              <div>
                <Backdrop show={true} />
                <AuthenticationModal />
              </div>
            )}
          />
          <Redirect to="/authentication" />
        </Switch>
      </Layout>
    );
  } else {
    el = (
      <Layout>
        <SongContainer isSignedIn={auth.isSignedIn} user={auth.user} />
      </Layout>
    );
  }
  return <div className="App">{el}</div>;
};

export default withRouter(App);
