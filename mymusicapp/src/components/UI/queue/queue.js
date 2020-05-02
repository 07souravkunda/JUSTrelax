import React from "react";
import Styles from "./queue.module.css";
import Button from "../Button/Button";
import { IoMdShuffle, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import * as QUEUE from "../../../store/actions/queue";

const Queue = (props) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.queue.player);
  const index = useSelector((state) => state.queue.index);
  console.log(player);
  console.log(index);
  return (
    <div
      className={Styles.queue}
      onMouseEnter={(e) => {
        const el = document.getElementsByClassName(Styles.queue);
        el[0].classList.add(Styles.extend);
        console.log(el.style);
      }}
      onMouseLeave={(e) => {
        const el = document.getElementsByClassName(Styles.queue);
        el[0].classList.remove(Styles.extend);
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        const data = JSON.parse(event.dataTransfer.getData("object"));
        dispatch(QUEUE.dropSong(data));
      }}
    >
      <div className={Styles.head}>
        <div className={Styles.contain}>
          <div className={Styles.name}>QUEUE</div>
          <IoMdShuffle
            className={Styles.IoMdShuffle}
            onClick={() => {
              // props.shuffleQueue;
              console.log("clicked");
              dispatch(QUEUE.shuffleQueue());
            }}
          />
        </div>
        <div className={Styles.contain}>
          <button
            className={Styles.btn}
            onClick={() => {
              // props.clearQueue
              dispatch(QUEUE.clearQueue());
            }}
          >
            CLEAR
          </button>
          <Button
            clicked={() => {
              if (player.length !== 0) {
                console.log("hello i am clicked..");
                //change
                // props.queueSavedHandler();
                dispatch(QUEUE.setShow(true));
              }
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
      {player.map((el) => {
        let classlist = [Styles.container];
        if (player[index].name === el.name) classlist.push(Styles.active);
        return (
          <div
            key={el.name}
            className={classlist.join(" ")}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("object", JSON.stringify(el));
              event.dataTransfer.setData("notify", "inside");
            }}
            onDragOver={(event) => {
              event.preventDefault();
              console.log("dragging over");
            }}
            onDrop={(event) => {
              console.log("dropped", event.dataTransfer.getData("object"));
              const data = JSON.parse(event.dataTransfer.getData("object"));
              const note = event.dataTransfer.getData("notify");
              event.stopPropagation();
              dispatch(QUEUE.queueDropped(data, el, note));
            }}
          >
            <img
              alt="song"
              src={`http://${el.imagePath}`}
              className={Styles.image}
              onClick={() => {
                dispatch(QUEUE.setIndex(el));
              }}
            ></img>
            <div
              className={Styles.text}
              onClick={() => {
                dispatch(QUEUE.setIndex(el));
              }}
            >
              <div style={{ alignSelf: "center" }}>{el.name}</div>
            </div>
            <div
              className={Styles.dequeue}
              onClick={() => {
                dispatch(QUEUE.removeFromQueue(el));
                console.log("clicked");
              }}
            >
              <IoIosClose className={Styles.IoIosClose} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Queue;
