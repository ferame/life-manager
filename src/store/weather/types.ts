// Describing the shape of the weather components's slice of state
export interface Location {
    user: string;
    location: string;
    timestamp: number;
  }

  export interface WeatherState {
    locations: Location[];
  }

  // Describing the different ACTION NAMES available
  export const ADD_LOCATION = 'ADD_LOCATION';
  export const DELETE_LOCATION = 'DELETE_LOCATION';

  interface AddLocationAction {
    type: typeof ADD_LOCATION;
    payload: Location;
  }

  interface DeleteLocationAction {
    type: typeof DELETE_LOCATION;
    meta: {
      timestamp: number;
    };
  }

  export type LocationActionTypes = AddLocationAction | DeleteLocationAction;
