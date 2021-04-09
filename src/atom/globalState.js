import { atom } from "recoil";

export const loggedInUser = atom({
  key: "loggedInUser",
  default: {},
  persistence_UNSTABLE: {
    type: "loggedInUser",
  },
});

export const navBar = atom({
  key: "navBar",
  default: {
    "chats": true,
    "users": false
  },
  persistence_UNSTABLE: {
    type: "navBar",
  },
});
