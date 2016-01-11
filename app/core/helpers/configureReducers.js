import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';

import todoListReducer from '../../modules/todoList/todoReducer';

export default function configureReducers() {
  return combineReducers({
    routing: routeReducer,
    todos: todoListReducer
  });
}
