import axios from 'axios';
import { DEVICE_IP } from '@env';

export const passwordService = {
    
    checkEmailExistence: async (data) => {
        try {
            const response = await axios.post(`${DEVICE_IP}:3000/db/password/checkEmailExistence`, {data});
            console.log("res in service", response.data.exists);
            return response.data;
        } catch (error) {
            console.error('Error in checkEmailExistence in service:', error);
        }
    },

    sendOTP: async (data) => {
        try {
            const response = await axios.post(`${DEVICE_IP}:3000/db/password/sendOTP`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred while sending OTP' };
        }
    },
    verifyOTP: async (data) => {
        try {
            const response = await axios.post(`${DEVICE_IP}:3000/db/password/verifyOTP`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred while verifying OTP' };
        }
    },
    resetPassword: async (data) => {
        try {
            const response = await axios.post(`${DEVICE_IP}:3000/db/password/resetPassword`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred while resetting password' };
        }
    },
};

export default passwordService;
