import React, { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
import Styles from "./Playlist.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import { LINK } from "../../assets/config";

const Playlist = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true, playlists: null };
  // }
  // componentDidMount = async () => {
  // try {
  //   let res = await axios.get("http://localhost:3000/api/v1/queue/");
  //   res = res.data;
  //   console.log(res.data);
  //   if (res.status === "success") {
  //     this.setState({
  //       playlists: res.data,
  //       loading: false,
  //     });
  //   }
  //   console.log(res);
  // } catch (er) {
  //   console.log(er);
  // }
  // };

  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${LINK}/queue/`);
      res = res.data;
      console.log(res.data);
      if (res.status === "success") {
        // this.setState({
        //   playlists: res.data,
        //   loading: false,
        // });
        setLoading(false);
        setPlaylists(res.data);
      }
      console.log(res);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let el;
  if (loading) {
    el = <Spinner />;
  } else if (playlists) {
    el = (
      <div className={Styles.Playlist}>
        <h4>PLAYLISTS</h4>
        <div className={Styles.card}>
          {playlists.map((el) => {
            return (
              <PlaylistCard
                name={el.name}
                songList={el.songList}
                key={el._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return <div>{el}</div>;
};

export default Playlist;
