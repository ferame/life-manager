import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { addLocation } from '../weather/actions';
import { AppState } from '../index';

export const thunkAddLocation = (
  location: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const asyncResp = await exampleAPI();
  dispatch(
    addLocation({
      location,
      user: asyncResp,
      timestamp: new Date().getTime()
    })
  );
};

function exampleAPI() {
  return Promise.resolve('Async Bot');
}
