export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const SHUFFLE_QUEUE = "SHUFFLE_QUEUE";
export const SAVE_QUEUE = "SAVE_QUEUE";
export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const QUEUE_DROPPED = "QUEUE_DROPPED";
export const DROP_MUSIC = "DROP_MUSIC";
export const SET_INDEX = "SET_INDEX";
export const SET_SHOW = "SET_SHOW";
export const SET_PLAYER = "SET_PLAYER";
export const END_HANDLER = "END_HANDLER";

export const endHandler = () => ({ type: END_HANDLER });

export const setPlayer = (arr) => ({ type: SET_PLAYER, arr });

export const setShow = (bool) => ({ type: SET_SHOW, bool });

export const setIndex = (index) => ({ type: SET_INDEX, index });

export const addToQueue = (song) => {
  return {
    type: ADD_TO_QUEUE,
    song,
  };
};

export const removeFromQueue = (song) => {
  return {
    type: REMOVE_FROM_QUEUE,
    song,
  };
};

export const shuffleQueue = () => {
  return {
    type: SHUFFLE_QUEUE,
  };
};

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE,
  };
};

export const queueDropped = (music1, music2, note) => {
  return {
    type: QUEUE_DROPPED,
    music1,
    music2,
    note,
  };
};

export const dropSong = (music) => {
  return {
    type: DROP_MUSIC,
    music,
  };
};
