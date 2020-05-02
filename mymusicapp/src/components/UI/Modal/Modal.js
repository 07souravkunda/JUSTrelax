import React, { useState } from "react";
import Styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxilary";
import { IoIosArrowRoundForward } from "react-icons/io";
import Axios from "axios";
import Spinner from "../Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../../../store/actions/queue";

const Modal = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = { name: "", loading: false };
  // }
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const show = useSelector((state) => state.queue.show);
  const songArr = useSelector((state) => state.queue.player);

  let el = <img alt="logo" src={require("../Logo/images/logo.PNG")}></img>;
  if (loading) {
    el = <Spinner />;
  }
  return (
    <Aux>
      <Backdrop
        show={show}
        clicked={() => dispatch(setShow(false))} //change
      />
      <div
        className={Styles.Modal}
        style={
          show
            ? null
            : {
                transform: "translateY(-200%)",
                opacity: "0",
              }
        }
      >
        <h3>ADD TO PLAYLIST</h3>
        <div>{el}</div>
        <h4>Create a Playlist to continue</h4>
        <div className={Styles.createPlaylist}>
          <input
            placeholder="Create a new Playlist"
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              // this.setState({ name: e.target.value });
              setName(e.target.value);
            }}
          ></input>
          <IoIosArrowRoundForward
            className={Styles.icon}
            onClick={async () => {
              let arr = songArr //change
                ? songArr.map((el) => JSON.stringify(el))
                : null;
              // console.log(name, arr, this.props);
              const obj = {
                name: name,
                songList: arr,
              };
              console.log(obj);
              try {
                // this.setState({ loading: true });
                setLoading(true);
                await Axios.post("http://localhost:3000/api/v1/queue/", obj);
                // this.setState({ loading: false, name: null });
                setLoading(false);
                setName(null);
                // queueCanceledHandler(); //change
                dispatch(setShow(false));
              } catch (er) {
                console.log(er);
                setLoading(false);
                setName("");
                // this.setState({ loading: false, name: null });
              }
            }}
          />
        </div>
      </div>
    </Aux>
  );
};

export default Modal;
