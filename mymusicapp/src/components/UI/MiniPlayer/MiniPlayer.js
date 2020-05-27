import React from "react";
import Styles from "./MiniPlayer.module.css";
import { endHandler } from "../../../store/actions/queue";
import { useDispatch, useSelector } from "react-redux";

const MiniPlayer = (props) => {
  let el = <div></div>;
  const dispatch = useDispatch();
  const player = useSelector((state) => state.queue.player);
  const index = useSelector((state) => state.queue.index);
  if (player[index]) {
    el = (
      <audio
        className={Styles.miniPlayer}
        controls={true}
        autoPlay={true}
        preload="none"
        src={`${player[index].audioPath}`}
        onEnded={() => {
          dispatch(endHandler());
        }}
      ></audio>
    );
  }
  return el;
};

export default MiniPlayer;
