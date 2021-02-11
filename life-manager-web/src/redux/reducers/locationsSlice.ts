import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { AppThunk, RootState } from '../store';

interface Location {
    city: string;
    country: string;
}

interface LocationsState {
    locationsList: Array<Location>;
}

const initialState: LocationsState = {
    locationsList: [],
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Array<Location>>) => {
        state.locationsList = action.payload;
    }
  },
});


export const updateLocations = (userToken: string): AppThunk => dispatch => {
    Axios.get('api/weather/locations', {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
    }).then(response => {
        console.log(response);
    });
}

export const selectCount = (state: RootState) => state.locations.locationsList;

export default locationsSlice.reducer;
