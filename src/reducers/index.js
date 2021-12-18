import { combineReducers } from 'redux';
import { sessionReducer as session } from 'redux-react-session';
import todoReducer from './todoReducer';
const rootReducer = combineReducers({
  session,
  todoReducer
});

export default rootReducer;
