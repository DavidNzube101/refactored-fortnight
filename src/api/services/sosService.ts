import { sos } from "../endpoints/sosEndpoint";
import { GET_API } from "../methods";

export const sosData = async (zone_id: number) => {
  const endpointWithParams = `${sos}?zones=${zone_id}`;
    return GET_API(endpointWithParams )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e?.response;
      });
  };
  
  const sosServices = {
    sosData,
  };

  export default sosServices;