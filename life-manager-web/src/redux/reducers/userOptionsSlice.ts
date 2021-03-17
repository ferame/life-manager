import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
// import { some, isEqual } from 'lodash';
import { Location } from './locationsSlice';

export interface UserOptions {
  location: Location; //TODO: change to array later
}

export const initialUserOptionsState: UserOptions = {
  location: {
    city: "",
    country: ""
  }
};

export const userOptionsSlice = createSlice({
  name: 'user',
  initialState: initialUserOptionsState,
  reducers: {
    //   addLocation: (state, action: PayloadAction<Location>) => {
    //     some(state.locations, locationEntry => isEqual(locationEntry, action.payload)) ?? state.locations.push(action.payload);
    //   },
    //   removeLocation: (state, action: PayloadAction<Location>) => {
    //     state.locations = state.locations.filter((entry) => entry !== action.payload)
    //   }
    changeLocation: (state, action: PayloadAction<Location>) => {
        state.location = action.payload;
    }
  },
});

export const { changeLocation/*, addLocation, removeLocation*/ } = userOptionsSlice.actions;

export const selectUserOptions = (state: RootState) => state.userOptions as UserOptions;

export default userOptionsSlice.reducer;
