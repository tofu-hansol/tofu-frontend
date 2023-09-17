import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({

});

export const state = () => ({
  navAuth: false, 
});

export const getters = {
  getNavAuth: state => state.navAuth
};