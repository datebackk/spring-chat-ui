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
    chats: {name: "chats", isActive: true},
    users: {name: "users", isActive: false},
    users_add: {name: "users_add", isActive: false}
  },
  persistence_UNSTABLE: {
    type: "navBar",
  },
});
