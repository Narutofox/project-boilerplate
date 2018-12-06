/* eslint import/no-named-default: off */

import { combineReducers } from 'redux';
import { beerReducer } from './pages/Home/reducer';

export const reducers = combineReducers({
  beer: beerReducer
  // place other reducers here,
});
