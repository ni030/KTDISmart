import axios from 'axios';
import { DEVICE_IP } from '@env'

export const getWaterDispenser = async () => {
    console.log("ip: ", DEVICE_IP)
    console.log("Fetching water dispenser");
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/amenity/fetch/water_dispenser`);
        if(response.status === 200){
            return response.data
        }
    }catch(error){
        console.error("Error get water dispenser in service:", error.message)
    }
};
export const getRubbishBin = async () => {
    // console.log("ip: ", DEVICE_IP)
    console.log("Fetching rubbish bin");
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/amenity/fetch/rubbish_bin`);
        if(response.status === 200){
            return response.data
        }
    }catch(error){
        console.error("Error get rubbish bin in service:", error.message)
    }
};
export const getShop = async () => {
    // console.log("ip: ", DEVICE_IP)
    console.log("Fetching shop");
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/amenity/fetch/shop`);
        if(response.status === 200){
            return response.data
        }
    }catch(error){
        console.error("Error get shop in service:", error.message)
    }
};