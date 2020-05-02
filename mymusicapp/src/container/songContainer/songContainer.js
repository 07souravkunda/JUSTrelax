import React, { Component } from "react";
import axios from "axios";
import Songs from "../../components/songs/songs";
import Styles from "./songContainer.module.css";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import SearchModal from "../../components/UI/SearchModal/SearchModal";
import AuthenticationModal from "../../components/authenticationModal/authenticationModal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import { Route, Redirect, Switch } from "react-router-dom";
import Logout from "../../components/logoutmodal/logout";
import Playlist from "../../components/Playlist/Playlist";
import { LINK } from "../../assets/config";

axios.defaults.withCredentials = true;
class songContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedMusic: null,
      show: false,
      music: null,
    };
  }
  async componentDidMount() {
    if (this.props.isSignedIn) {
      try {
        let music = await axios.get(`${LINK}/audio`);
        music = music.data.data;
        this.setState({ music });
      } catch (er) {
        console.log(er);
      }
    }
  }

  submitHandler = (name) => {
    if (name.trim() !== " " && name) {
      this.setState({ searchedMusic: name.trim() });
    }
  };

  render() {
    let el1 = null;
    if (!this.props.isSignedIn) {
      el1 = <div>Sign in to continue</div>;
    } else if (this.state.music && window.location.pathname === "/") {
      el1 = (
        <div>
          <Songs music={this.state.music} genre="TRENDING" />
          <Songs music={this.state.music} genre="RECENT" />
          <Songs music={this.state.music} genre="ENLIGHTEN MOOD" />
        </div>
      );
    } else if (window.location.pathname === "/my-music") {
      el1 = <Playlist setQueue={this.props.setQueue} />;
    } else if (
      !this.props.isSignedIn &&
      window.location.pathname === "/authentication"
    ) {
      el1 = (
        <div>
          {" "}
          <Backdrop
            show={true}
            clicked={() => {
              this.props.history.push("/");
            }}
          />
          <AuthenticationModal />
        </div>
      );
    } else if (window.location.pathname === "/logout") {
      el1 = <Logout />;
    } else {
      el1 = (
        <Switch>
          <Route
            path="/search/:id"
            component={() => (
              <SearchModal
                value={this.state.searchedMusic}
                clickHandler={this.props.playHandler}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className={Styles.songContainer}>
        <SearchBar submitHandler={this.submitHandler} />

        {el1}
      </div>
    );
  }
}

export default songContainer;
