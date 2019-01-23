import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import MUTATIONS from './routerMutations';
import ACTIONS from './routerActions';

const http = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 1000,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
  },

  getters: {
    username: state => state.username,
  },

  mutations: {
    [MUTATIONS.SET_USERNAME](state, newUsername) {
      state.username = newUsername;
    },
  },

  actions: {
    [ACTIONS.INITIALIZE_USERNAME](context) {
      if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem('username')) {
          const username = localStorage.getItem('username');
          context.commit(MUTATIONS.SET_USERNAME, username);
          return;
        }
      }

      http.get('username/new')
        .then((res) => {
          const { username } = res.data;
          context.commit(MUTATIONS.SET_USERNAME, username);
          localStorage.setItem('username', username);
        });
    },
  },
});
