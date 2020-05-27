import React from "react";
import Styles from "./songs.module.css";
import SongList from "./song_list/song_list";
const Songs = (props) => {
  return (
    <div className={Styles.Songs}>
      <div style={{ color: "brown" }}>{props.genre}</div>
      <SongList music={props.music} playHandler={props.playHandler} />
    </div>
  );
};

export default Songs;
