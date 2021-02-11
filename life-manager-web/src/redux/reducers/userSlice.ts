import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

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

export default userSlice.reducer;
