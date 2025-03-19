import { RIDE_REQUEST,UPDATE_RIDE_REQUEST } from "../types/index";
import { rideRequestServices } from "../../services/index";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RideRequestInterface } from '../../interface/rideRequestInterface';


export const userRideRequest = createAsyncThunk(
    RIDE_REQUEST, 
    async (data: RideRequestInterface) => {
  const response = await rideRequestServices.userRideRequest(data);
  return response?.data;
});


export const updateRideRequest = createAsyncThunk(
  UPDATE_RIDE_REQUEST,
  async ({ payload, ride_id }: { payload: any; ride_id: number }) => {
    const response = await rideRequestServices.updateRideRequest({ payload, ride_id });
    return response?.data;
  }
);