import React, { useState } from "react";
import Styles from "./PlaylistCard.module.css";
import { setPlayer } from "../../../store/actions/queue";
import { useDispatch } from "react-redux";
import { IoIosPlayCircle } from "react-icons/io";
const PlaylistCard = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  return (
    <div
      className={Styles.container}
      onClick={(e) => {
        const list = props.songList.map((el) => JSON.parse(el));
        console.log(list);
        e.preventDefault();
        dispatch(setPlayer(list));
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={Styles.PlaylistCard}>
        {show ? <IoIosPlayCircle className={Styles.playButton} /> : null}
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default PlaylistCard;
