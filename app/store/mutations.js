import Vue from 'vue';

export default {
    ['CLEAR_TABLE'](state) {
        state.table = {
            error: '',
            fields: [],
            query: '',
            rows: [],
            offset: 0
        };
    },
    ['INVERT'](state) {
        state.dark = !state.dark;
    },
    ['LOAD_ERROR'](state, { error }) {
        state.table.error = error;
    },
    ['LOAD_TABLE'](state, { query, fields, rows }) {
        state.table = {
            error: '',
            fields: fields,
            query: query,
            rows: rows,
            offset: 0
        };
    },
    ['LOAD_SIDEBAR'](state, { items }) {
        state.sidebar = {
            items: items,
            selected: ''
        };
    },
    ['OPEN_CONSOLE_VIEW'](state) {
        state.sidebar.selected = '';
        state.view = 'console';
    },
    ['OPEN_TABLE_VIEW'](state, { name }) {
        state.sidebar.selected = name;
        state.view = 'table';
    }
}