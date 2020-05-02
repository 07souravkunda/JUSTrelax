import React, { useState } from "react";
import Styles from "./songCard.module.css";
import { useDispatch } from "react-redux";
import { addToQueue } from "../../../../store/actions/queue";
import { IoIosPlayCircle } from "react-icons/io";

const SongCard = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  return (
    <div
      className={Styles.songCard}
      onClick={(e) => {
        e.preventDefault();
        dispatch(addToQueue(props.music));
      }}
      draggable
      onDragStart={(event) => onDragStart(event, props.music)}
      onDrop={(event) => onDragDrop(event)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show ? (
        <div>
          <div className={Styles.container}></div>
          <IoIosPlayCircle className={Styles.playButton} />
        </div>
      ) : null}
      <img
        alt="song"
        className={Styles.image}
        src={`http://${props.music.imagePath}`}
      ></img>
    </div>
  );
};

const onDragStart = (event, music) => {
  event.persist();
  const da = JSON.stringify(music);
  event.dataTransfer.setData("object", da);
  event.dataTransfer.setData("notify", "outside");
  return music;
};
const onDragDrop = (event) => {};

export default SongCard;
