const Settings = window.require('electron-store');

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const settings = new Settings();

const state = {
    dark: settings.get('dark'),
    sidebar: {
        items: {},
        selected: ''
    },
    table: {
        error: '',
        fields: [],
        query: '',
        rows: [],
        offset: 0
    },
    view: 'console'
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});