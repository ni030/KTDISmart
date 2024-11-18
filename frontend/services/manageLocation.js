import axios from 'axios';
import { DEVICE_IP } from '@env'

export const saveCurrentLocation = async (matric, latitude, longitude) => {
    console.log("Saving current location");
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/navigation/create/location`,{
            matricnumber:matric,
            latitude,
            longitude
        });       
        console.log("Location saved successfully",response.data)
    } catch(error){
        console.error("Error saving current location:", error.message)
    }
};

export const saveSearchLocation = async (matric,latitude,longitude,address) => {
    console.log("Saving searched location");
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/navigation/create/search`,{
            matricnumber:matric,
            latitude,
            longitude,
            address
        });       
        console.log("Searched location saved successfully",response.data)
    }catch(error){
        console.log("Error saving searched location",error);
    }
};

export const fetchSearchLocation = async (matric) => {
    console.log("Fetching searched location");
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/navigation/check/${matric}`);
        console.log('Fetched recent searched locations:',response.data.locations);
        return response.data.locations;
    }catch(error){
        console.log('Error fetching searched location',error);
    }
};