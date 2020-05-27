import React, { Component } from "react";
import axios from "axios";
import SongCard from "../../songs/song_list/songCard/songCard";
import Spinner from "../Spinner/Spinner";
import { LINK } from "../../../assets/config";
class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = { music: null, message: null };
  }
  async componentDidMount() {
    try {
      let data;
      let value = this.props.value.trim();
      if (value && value !== " ")
        data = await axios.get(`${LINK}/audio/search/${value}`);
      if (data.data.status === "success")
        this.setState({ music: data.data.data, message: null });
      else {
        this.setState({});
      }
    } catch (er) {
      console.log(er);
    }
  }

  render() {
    let el = <Spinner />;
    if (this.state.music) {
      el = (
        <SongCard
          music={this.state.music}
          clickHandler={this.props.clickHandler}
        />
      );
    }

    return el;
  }
}

export default SearchModal;
