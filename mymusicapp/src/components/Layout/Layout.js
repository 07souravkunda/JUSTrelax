import React, { Component } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Queue from "../UI/queue/queue";
import MiniPlayer from "../UI/MiniPlayer/MiniPlayer";
import Modal from "../UI/Modal/Modal";

class Layout extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Queue />
        <Modal />
        {this.props.children}
        <MiniPlayer />
      </div>
    );
  }
}

export default Layout;
