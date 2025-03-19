import { COUPON } from '../types'
import { couponService } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const couponListData = createAsyncThunk(
    COUPON,
    async ({  service_id, zoneIds }: {  service_id: number, zoneIds: number }) => {
        const response = await couponService.couponListData({  service_id, zoneIds });
        return response?.data;
    },
);
