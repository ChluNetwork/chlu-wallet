import { combineReducers } from 'redux';
import locationReducer from './modules/location';
import { reducer as formReducer } from 'redux-form';
import ui from './modules/ui'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    ui
  })
};

export default makeRootReducer;
