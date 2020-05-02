import axios from "axios";

import { LINK } from "../../assets/config";

axios.defaults.withCredentials = true;

export const getUserDetails = () => {
  return axios.get(`${LINK}/users/getLoginDetails`);
};

export const loginUserUtil = (data) => {
  return axios.post(`${LINK}/users/login`, data);
};

export const logoutUserUtil = () => {
  return axios.post(`${LINK}/users/logout`);
};

export const playerHandler = (music, player) => {
  let newPlayer = player;
  let index;
  if (player.length === 0) {
    index = -1;
  } else
    index = player.map((el) => el.name).findIndex((el) => el === music.name);
  if (index !== -1) {
    newPlayer = [...player];
  } else {
    newPlayer = [music, ...player];
    index = 0;
  }
  return { newPlayer, index };
};

export const shufflePlayer = (arr) => {
  let curIndex = arr.length,
    randomIndex,
    temp;
  while (curIndex !== 0) {
    randomIndex = Math.floor(Math.random() * curIndex);
    curIndex -= 1;
    temp = arr[randomIndex];
    arr[randomIndex] = arr[curIndex];
    arr[curIndex] = temp;
  }
  return arr;
};

export const queueDroppedHandler = (music1, music2, note, player) => {
  let newPlayer;
  const index1 = player
    .map((el) => el.name)
    .findIndex((el) => el === music1.name);
  const index2 = player
    .map((el) => el.name)
    .findIndex((el) => el === music2.name);
  if (note === "outside") {
    if (index1 === -1) {
      const arr1 = player.slice(0, index2);
      const arr2 = player.slice(index2);
      newPlayer = [...arr1, music1, ...arr2];
    } else return;
  } else {
    let arr1, arr2, arr3;
    if (index1 < index2) {
      arr1 = player.slice(0, index1);
      arr2 = player.slice(index1 + 1, index2 + 1);
      arr3 = player.slice(index2 + 1);
      newPlayer = [...arr1, ...arr2, music1, ...arr3];
    } else {
      arr1 = player.slice(0, index2);
      arr2 = player.slice(index2, index1);
      arr3 = player.slice(index1 + 1);
      newPlayer = [...arr1, music1, ...arr2, ...arr3];
    }
  }
  return newPlayer;
};

export const dropHandler = (music, player) => {
  let newPlayer, index;
  if (player.length === 0) {
    index = -1;
  } else
    index = player.map((el) => el.name).findIndex((el) => el === music.name);
  if (index !== -1) {
    newPlayer = [...player];
  } else newPlayer = [...player, music];

  return newPlayer;
};

export const clickHandler = (music, player) => {
  const index = player
    .map((el) => el.name)
    .findIndex((el) => el === music.name);
  return index;
};
