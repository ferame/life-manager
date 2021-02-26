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
      authenticateUser: (state, action: PayloadAction<User>) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
      },
      unauthenticateUser: (state) => {
        state.username = initialState.username;
        state.token = initialState.token;
      }
  },
});

export const { authenticateUser, unauthenticateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const login = (user: User): AppThunk => dispatch => {
  dispatch(authenticateUser(user));
  console.log("User logged in");
  updateLocations(user.token);
  console.log("Called location getter");
}

export const logout = (): AppThunk => dispatch => {
  dispatch(unauthenticateUser());
  console.log("User logged out");
}

export default userSlice.reducer;
