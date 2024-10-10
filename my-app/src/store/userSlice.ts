import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface UserState {
  userId: number | null;
  username:string | null;
}

// Initial state
const initialState: UserState = {
  userId: null,
  username:""
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUserName: (state) => {
      state.username = null;
    },
  },
});

// Export actions
export const { setUserId, clearUserId,setUserName,clearUserName } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
