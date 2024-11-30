import axios from 'axios';
import { DEVICE_IP } from '@env';

export const authService = {
  // Register user
  register: async (userData) => {
    try {
      const response = await axios.post(`${DEVICE_IP}:3000/db/user/register`, userData);
      return response.data;
    } catch (error) {
      console.log('Error in register service:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  },

  // Login user
  login: async (credentials) => {
    console.log(`Login Services | credentials -> ${JSON.stringify(credentials)}`)
    try {
        console.log("Check url -> "+ DEVICE_IP)
        const response = await axios.post(`${DEVICE_IP}:3000/db/user/login`, credentials);
        console.log(`Login Services | response -> ${JSON.stringify(response)}`)
        return response.data;
    } catch (error) {
      console.log('Error in login service:', JSON.stringify(error.response) || error.message);
      throw error.response || { message: 'An error occurred during login' };
    }
  },
  // Check if user exists
  checkIsUserExist: async (userData) => {
    console.log(`CheckIsUserExist Service | userData -> ${JSON.stringify(userData)}`);
    try {
      const response = await axios.post(`${DEVICE_IP}:3000/db/user/checkIsUserExist`, userData);
      console.log(`CheckIsUserExist Service | response -> ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      console.log('Error in checkIsUserExist service:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred while checking user existence' };
    }
  },
  getUserById: async (userId) => {
    try {
      const response = await axios.post(`${DEVICE_IP}:3000/db/user/getUserById`, {userId: userId});
      return response.data;
    } catch (error) {
      console.log('Error in getUserById service:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred while fetching user details' };
    }
  }
};

export default authService;
