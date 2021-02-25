import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { updateLocations } from '../reducers/locationsSlice'

interface User {
  username: string;
  token: string;
}

const initialState: User = {
  username: "",
  token: ""
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
      }
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const login = (user: User): AppThunk => dispatch => {
  dispatch(setUser(user));
  console.log("Dispatced user setter");
  updateLocations(user.token);
  console.log("Called location getter");
}

export const logout = (): AppThunk => dispatch => {
  dispatch(setUser(initialState));
  console.log("User logged out");
}

export default userSlice.reducer;
