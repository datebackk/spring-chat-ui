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

export const openedDialog = atom({
  key: "openedDialog",
  default: {},
  persistence_UNSTABLE: {
    type: "openedDialog",
  },
});


export const chats = atom({
  key: "chats",
  default: [{}],
  persistence_UNSTABLE: {
    type: "chats",
  },
});

export const chatMessages = atom({
  key: "chatMessages",
  default: [{}],
  persistence_UNSTABLE: {
    type: "chatMessages",
  },
});
