import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UIState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: UIState = {
  isOpen: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpen: action.payload,
    }),
  },
});

export const { setSidebar } = applicationSlice.actions;

export default applicationSlice.reducer;
