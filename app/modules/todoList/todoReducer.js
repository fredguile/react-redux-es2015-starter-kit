import {Map} from 'immutable';
import {handleActions} from 'redux-actions';
import uuid from 'node-uuid';

import {TODO_ADD_ITEM, TODO_REMOVE_ITEM} from './todoActions';

const initialState = new Map();

export default (state = initialState, action) => {
  // we support feeding initial state with an array of items
  if(!Map.isMap(state) && Array.isArray(state)) {
    return Map(state.map(item => ([uuid.v1(), item])));
  }

  return handleActions({
    [TODO_ADD_ITEM]: (state, action) => {
      const {payload: {item}} = action;
      return state.set(uuid.v1(), item);
    },

    [TODO_REMOVE_ITEM]: (state, action) => {
      const {payload: {uuid}} = action;
      return state.delete(uuid);
    }
  })(state, action);
}
