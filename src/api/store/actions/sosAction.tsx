import { SOS } from "../types/index";
import { SOSInterface } from "../../interface/sosInterface";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sosServices } from "@src/api/services"; 


  export const sosData = createAsyncThunk(
    SOS,
    async (data: SOSInterface) => {
        const response = await sosServices.sosData(data.zone_id);
        return response?.data;
    },
);
