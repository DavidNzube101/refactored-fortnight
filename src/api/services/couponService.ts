import {
    coupons
} from '../endpoints/couponeEndPoint'
import { GET_API } from '../methods';

export const couponListData = async ({ zoneIds, service_id,  }: { zoneIds: number; service_id: number; }) => {
    return GET_API(`${coupons}?zoneIds=${zoneIds}&service_id=${service_id}`)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e?.response;
        });
};


const couponService = {
    couponListData,
};

export default couponService;
