import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import userReducer from './reducers/userSlice';
import userOptionsReducer from './reducers/userOptionsSlice';
import locationsReducer from './reducers/locationsSlice';
import weatherReducer from './reducers/weatherSlice';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, PersistedState, saveState } from './localStorage';

export const persistedState: PersistedState = loadState();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    userOptions: userOptionsReducer,
    locations: locationsReducer,
    weather: weatherReducer
  },
  middleware: [thunk, ...getDefaultMiddleware()],
  preloadedState: {
    user: persistedState.user,
    userOptions: persistedState.userOptions
  }
});

store.subscribe(throttle(() => {
  saveState(store.getState().user, store.getState().userOptions);
}, 1000));

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
