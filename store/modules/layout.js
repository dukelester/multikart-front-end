import Config from "../../data/config.json";
const state = {
  layout: Config,
};
// mutations
const mutations = {
  set: (state) => {
    if (process.client) {
      state.layout.config.color =
        localStorage.getItem("color") || state.layout.config.color;
      document.body.classList.toggle(state.layout.config.layout_version);
      if (state.layout.config.color) {
        document.documentElement.style.setProperty(
          "--theme-deafult",
          state.layout.config.color
        );
      }
    }
  },
  setLayoutType: (state, payload) => {
    if (payload === "rtl") {
      document.body.classList.remove("ltr");
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
      document.body.classList.add("ltr");
    }
  },
  setColorScheme: (state, payload) => {
    state.layout.config.color = payload;
    if (process.client) {
      localStorage.setItem("color", state.layout.config.color);
    }
  },
  setLayoutVersion: (state, payload) => {
    if (state.layout.config.layout_version == "dark") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      state.layout.config.layout_version = "light";
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      state.layout.config.layout_version = "dark";
    }
  },
};
// actions
const actions = {
  set: (context) => {
    context.commit("set");
  },
  setColorScheme: (context, payload) => {
    context.commit("setColorScheme", payload);
  },
  setLayoutType: (context, payload) => {
    context.commit("setLayoutType", payload);
  },
  setLayoutVersion: (context, payload) => {
    context.commit("setLayoutVersion", payload);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
