import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface UserOptions {
  locations: Location[];
}

const initialState: UserOptions = {
  locations: []
};

export const userOptionsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      addLocation: (state, action: PayloadAction<Location>) => {
        state.locations.push(action.payload)
      },
      removeLocation: (state, action: PayloadAction<Location>) => {
        state.locations = state.locations.filter((entry) => entry !== action.payload)
      }
  },
});

export const { addLocation, removeLocation } = userOptionsSlice.actions;

export const selectUserOptions = (state: RootState) => state.userOptions;

export default userOptionsSlice.reducer;
