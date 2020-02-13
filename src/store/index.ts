import { createStore, combineReducers } from 'redux';
import { systemReducer } from './system/reducers';
import { weatherReducer } from './weather/reducers';

const rootReducer = combineReducers({
  system: systemReducer,
  weather: weatherReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer
  );

  return store;
}
