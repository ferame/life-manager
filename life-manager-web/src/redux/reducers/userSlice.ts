import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { updateLocations } from '../reducers/locationsSlice'

export interface User {
  username: string;
  token: string;
  isAuthenticated: boolean;
}

export const initialUserState: User = {
  username: "",
  token: "",
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
      authenticateUser: (state, action: PayloadAction<User>) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
      unauthenticateUser: (state) => {
        state.username = initialUserState.username;
        state.token = initialUserState.token;
        state.isAuthenticated = false;
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
