import axios from "axios";
import { DEVICE_IP } from "@env"; // Import environment variable for device IP

export const otpService = {
  // Send OTP to the user's email
  sendOTP: async (email) => {
    try {
      const response = await axios.post(`${DEVICE_IP}:3000/db/otp/send-otp`, {
        email,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in sendOTP service:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data || {
          message: "An error occurred while sending OTP",
        }
      );
    }
  },

  // Verify the OTP for the user's email
  verifyOTP: async (email, otp) => {
    console.log(`email -> ${email} | otp -> ${otp}`);
    try {
      const response = await axios.post(`${DEVICE_IP}:3000/db/otp/verify-otp`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in verifyOTP service:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data || {
          message: "An error occurred while verifying OTP",
        }
      );
    }
  },
};

export default otpService;
