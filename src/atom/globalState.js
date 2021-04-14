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
    users: {name: "users", isActive: false},
    chats: {name: "chats", isActive: true},
    users_add: {name: "users_add", isActive: false}
  },
  persistence_UNSTABLE: {
    type: "navBar",
  },
});

export const opendDialog = atom({
  key: "opendDialog",
  default: {},
  persistence_UNSTABLE: {
    type: "opendDialog",
  },
});
