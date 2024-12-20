import axios from 'axios';
import { DEVICE_IP } from '@env'

// 2. Send OTP via email
export const sendOtpEmail = async (userEmail) => {
    console.log("sending email in service")
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/password/sendOTP`, {
            userEmail
        })
        console.log("reponse in service: ", response)
    }catch{
        console.error("Error in sending otp:", error.message)
    }
}

// 3. Verify OTP
// const verifyOtp = (enteredOtp) => {
//   if (!generatedOtp || !otpExpiry) {
//     return { success: false, message: "OTP not generated yet" };
//   }

//   if (Date.now() > otpExpiry) {
//     return { success: false, message: "OTP has expired" };
//   }

//   if (enteredOtp === generatedOtp) {
//     return { success: true, message: "OTP verified successfully" };
//   }

//   return { success: false, message: "Invalid OTP" };
// };

