import React, { useState } from "react";
import Styles from "./song_list.module.css";
import SongCard from "./songCard/songCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const SongList = props => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  return (
    <div className={Styles.test}>
      <ul className={Styles.songList}>
        {props.music.slice((page - 1) * limit, page * limit).map(el => {
          // console.log(el);
          return (
            <SongCard
              name={el.name}
              music={el}
              audio={el.imagePath}
              key={el.name}
              clickHandler={props.playHandler}
            />
          );
        })}
      </ul>
      <IoIosArrowForward
        className={Styles.button}
        onClick={e => {
          console.log(page);
          console.log(props.music.length);
          if (page * limit < props.music.length)
            setPage(prevPage => prevPage + 1);
          // console.log(e.target.parentElement);
          // const count = e.target.parentElement.childNodes[0].childNodes.length;

          // console.log(count);
          // const el = e.target.parentElement.childNodes[0];
          // console.log(el);
          // console.log(el.parentElement.offsetWidth);

          // el.style.right =
          //   el.style.right.split("px")[0] * 1 +
          //   Math.floor(el.parentElement.offsetWidth / 200) * 200 +
          //   "px";
        }}
      >
        next
      </IoIosArrowForward>
      <IoIosArrowBack
        className={Styles.pre}
        onClick={e => {
          if ((page - 1) * limit > 0) setPage(prevPage => prevPage - 1);
          // const el = document.getElementsByClassName(Styles.songList);
          // if (
          //   el[0].offsetLeft +
          //     Math.floor(el[0].parentElement.offsetWidth / 200) * 200 <
          //   0
          // ) {
          //   el[0].style.left =
          //     el[0].offsetLeft +
          //     Math.floor(el[0].parentElement.offsetWidth / 200) * 200 +
          //     "px";
          //   console.log(el[0].offsetLeft);
          //   console.log(el[0]);
          // }
          // console.log(e.target.parentElement);
          /* const el = e.target.parentElement.childNodes[0];
          console.log(el);
          console.log(el.parentElement);
          if (el.style.right.split("px")[0] > 0)
            el.style.right = el.style.right.split("px")[0] * 1 - 1000 + "px";*/
          // console.log()
          // console.log(el.offsetLeft);
          // if (
          //   el.offsetLeft +
          //     Math.floor(el.parentElement.parentElement.offsetWidth / 200) *
          //       200 <
          //   0
          // ) {
          //   el.style.left =
          //     el.offsetLeft +
          //     Math.floor(el.parentElement.parentElement.offsetWidth / 200) *
          //       200 +
          //     "px";
          //   console.log(el);
          //   // console.log(el[0].offsetLeft);
          //   // console.log(el[0]);
          // }
        }}
      >
        previous
      </IoIosArrowBack>
    </div>
  );
};

export default SongList;
