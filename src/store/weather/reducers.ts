import {
    WeatherState,
    ADD_LOCATION,
    DELETE_LOCATION,
    LocationActionTypes
  } from './types';

  export const initialState: WeatherState = {
    locations: []
  };

  export function weatherReducer(
    state = initialState,
    action: LocationActionTypes
  ): WeatherState {
    switch (action.type) {
      case ADD_LOCATION:
        return {
          locations: [...state.locations, action.payload]
        };
      case DELETE_LOCATION:
        return {
            locations: state.locations.filter(
            location => location.timestamp !== action.meta.timestamp
          )
        };
      default:
        return state;
    }
  }
