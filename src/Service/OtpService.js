import axios from "axios";

const endpoint = "https://localhost:7015/api/";

export  const OtpService = {
    getOTP :(userName) =>{
        return  axios.get(`${endpoint}GenerateOTP?userName=${userName}`);
    }};