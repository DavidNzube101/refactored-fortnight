import { rideRequest } from "../endpoints/rideRequestEndPoint";
import {
  RideRequestInterface,
} from "../interface/rideRequestInterface";
import {  POST_API, PUT_API } from "../methods";


export const userRideRequest = async (data: RideRequestInterface) => {
    return POST_API(data, rideRequest)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e?.response;
      });
  };

  export const updateRideRequest = async ({ payload, ride_id }: { payload: any; ride_id: number }) => {
    return PUT_API(`${rideRequest}/${ride_id}`, payload) 
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e?.response;
      });
  };

  
  const rideRequestServices = {
    userRideRequest,
    updateRideRequest
  };
  
  export default rideRequestServices;

