import React, { useState, useEffect } from 'react';
import { OtpService } from '../Service/OtpService';
import './GenerateOTP.css';

const GenerateOTP = () => {
  const [userId, setUserId] = useState('');
  const [otp, setOTP] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const generateOTP = async () => {
    try {
      setIsButtonDisabled(true);
      const response = await OtpService.getOTP(userId);
      const data = response.data;

      setOTP(data.token);
      setRemainingTime(data.remTime);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, data.rem_time * 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="generate-otp-container">
      <h2>Generate OTP</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
        className={`generate-button ${isButtonDisabled ? 'disabled' : ''}`}
        onClick={generateOTP}
        disabled={isButtonDisabled}
      >
        Generate OTP
      </button>
      <div className="otp-result">
        <strong>OTP:</strong> {otp}
      </div>
      <div className="remaining-time">
        <strong>Remaining Time:</strong> {remainingTime} seconds
      </div>
    </div>
  );
};

export default GenerateOTP;
