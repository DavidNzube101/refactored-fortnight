import { createSlice } from '@reduxjs/toolkit';
import { userRideRequest, updateRideRequest } from '../actions/rideRequestAction'
import { RideRequestInterface } from '../../interface/rideRequestInterface';


const initialState: RideRequestInterface = {
  rideRequestData: [],
  updateRideRequestData: [],
  token: '',
  loading: false,
  success: false,
  fcmToken: '',
};


const rideRequestSlice = createSlice({
  name: 'rideRequest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userRideRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRideRequest.fulfilled, (state, action) => {
      state.rideRequestData = action.payload;
      state.loading = false;
    });
    builder.addCase(userRideRequest.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    //update bid
    builder.addCase(updateRideRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRideRequest.fulfilled, (state, action) => {
      state.updateRideRequestData = action.payload;
      state.loading = false;
    });
    builder.addCase(updateRideRequest.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default rideRequestSlice.reducer;
