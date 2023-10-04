import { createStore } from "vuex";
import axios from "axios";

interface State {
  token: string | null;
}

const ENDPOINTS = {
  registerURL: process.env.REGISTER_URL,
  loginURL: process.env.LOGIN_URL,
};

const HEADERS = {
  "Access-Control-Allow-Origin": process.env.ORIGIN_URL,
  "Content-Type": "application/json",
};
export default createStore({
  state: {} as State,
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
