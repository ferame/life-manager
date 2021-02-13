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
    updateLocs: (state, action: PayloadAction<Array<Location>>) => {
        state.locationsList = action.payload;
    }
  },
});

export const { updateLocs } = locationsSlice.actions;

export const updateLocations = (userToken: string): AppThunk => dispatch => {
    console.log("Updating locations");
    Axios.get('api/weather/locations', {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
    }).then(response => {
        const locationsArray: Array<Location> = response?.data?.map((locationItem: { name: string; country: string; }) => {
            return {
                city: locationItem?.name,
                country: locationItem?.country
            }
        })
        dispatch(updateLocs(locationsArray));
        console.log(response);
    });
}

export const selectLocations = (state: RootState) => state.locations.locationsList;

export default locationsSlice.reducer;
