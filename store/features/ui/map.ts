import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state

export interface URLMapState {
  zoom?: number;
  lat?: number;
  lng?: number;
  datasets?: string[];
}
export interface MapState {
  basemap: string;
  labels: string;
  boundaries: boolean;
  mapState: URLMapState;
}


// Define the initial state using that type
const initialState: MapState = {
  basemap: 'dark',
  labels: 'none',
  boundaries: false,
  mapState: {},
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBasemap: (state, action: PayloadAction<string>) => ({
      ...state,
      basemap: action.payload,
    }),
    setLabels: (state, action: PayloadAction<string>) => ({
      ...state,
      labels: action.payload,
    }),
    setBoundaries: (state, action: PayloadAction<boolean>) => ({
      ...state,
      boundaries: action.payload,
    }),
    setMapState: (state, action: PayloadAction<URLMapState>) => ({
      ...state,
      mapState: {
        ...state.mapState,
        ...action.payload,
      }
    }),
  },
});

export const { setBasemap, setLabels, setBoundaries, setMapState } = mapSlice.actions;

export default mapSlice.reducer;
