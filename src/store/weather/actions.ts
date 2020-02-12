import { Location, ADD_LOCATION, DELETE_LOCATION } from './types';

export function addLocation(newLocation: Location) {
  return {
    type: ADD_LOCATION,
    payload: newLocation
  };
}

export function deleteLocation(timestamp: number) {
  return {
    type: DELETE_LOCATION,
    meta: {
      timestamp
    }
  };
}
