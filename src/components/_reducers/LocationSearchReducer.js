import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from '../_actions/LocationActions';

const status = handleActions(
  {
    [actions.fetchSearchHints.REQUEST]() {
      return 'request';
    },
    [actions.fetchSearchHints.SUCCESS]() {
      return 'success';
    },
    [actions.fetchSearchHints.FAILURE]() {
      return 'failure';
    },
    [actions.fetchSearchHints.FULFILL]() {
      return 'none';
    },
    [actions.fetchCurrentLocation.REQUEST]() {
      return 'request';
    },
    [actions.fetchCurrentLocation.SUCCESS]() {
      return 'success';
    },
    [actions.fetchCurrentLocation.FAILURE]() {
      return 'failure';
    },
  },
  'none'
);

const hints = handleActions(
  {
    [actions.fetchSearchHints.TRIGGER]() {
      return [];
    },
    [actions.fetchSearchHints.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchSearchHints.FULFILL]() {
      return [];
    },
  },
  []
);

const query = handleActions(
  {
    [actions.fetchSearchHints.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.selectLocation.TRIGGER](state, { payload }) {
      return payload.title;
    },
    [actions.fetchCurrentLocation.SUCCESS](state, { payload }) {
      return payload.title;
    },
  },
  localStorage.getItem('location') ? JSON.parse(localStorage.getItem('location')).title : ''
);

const currentLocation = handleActions(
  {
    [actions.selectLocation.TRIGGER](state, { payload }) {
      return {
        id: payload.id,
        title: payload.title,
      };
    },
    [actions.fetchCurrentLocation.SUCCESS](state, { payload }) {
      return {
        id: payload.id,
        title: payload.title,
      };
    },
  },
  { id: '', title: '' }
);

const search = combineReducers({
  status,
  hints,
  query,
});

const location = combineReducers({
  search,
  currentLocation,
});

export default location;
