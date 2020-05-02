import * as QUEUE from "../actions/queue";
import {
  playerHandler,
  shufflePlayer,
  queueDroppedHandler,
  dropHandler,
  clickHandler,
} from "../utilMethods/methods";

const initialState = {
  player: [],
  index: 0,
  show: false,
};
let newPlayer;
export const queueReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUEUE.ADD_TO_QUEUE:
      newPlayer = playerHandler(action.song, state.player);
      return Object.assign({}, state, {
        player: newPlayer.newPlayer,
        index: newPlayer.index,
      });
    case QUEUE.CLEAR_QUEUE:
      return Object.assign({}, state, { player: [] });
    case QUEUE.SHUFFLE_QUEUE:
      newPlayer = shufflePlayer(state.player);
      return Object.assign({}, state, { player: [...newPlayer] });
    case QUEUE.QUEUE_DROPPED:
      newPlayer = queueDroppedHandler(
        action.music1,
        action.music2,
        action.note,
        state.player
      );
      return Object.assign({}, state, { player: newPlayer });
    case QUEUE.DROP_MUSIC:
      newPlayer = dropHandler(action.music, state.player);
      return Object.assign({}, state, { player: newPlayer });
    case QUEUE.SET_INDEX:
      console.log("khhj");
      return Object.assign({}, state, {
        index: clickHandler(action.index, state.player),
      });
    case QUEUE.SET_SHOW:
      return Object.assign({}, state, { show: action.bool });
    case QUEUE.SET_PLAYER:
      return Object.assign({}, state, { player: action.arr });
    case QUEUE.END_HANDLER:
      return Object.assign({}, state, {
        index: (state.index + 1) % state.player.length,
      });
    case QUEUE.REMOVE_FROM_QUEUE:
      const index = state.player.findIndex((el) => el.id === action.song.id);
      newPlayer = [...state.player];
      console.log(newPlayer, index);
      newPlayer.splice(index, 1);
      return Object.assign({}, state, {
        player: newPlayer,
        index: state.index < newPlayer.length ? state.index : 0,
      });
    default:
      return state;
  }
};
