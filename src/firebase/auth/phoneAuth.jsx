// src/firebase/auth/PhoneSignIn.jsx
import { useState, useRef } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

export const PhoneSignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const confirmationResult = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const recaptchaContainerRef = useRef(null);

  // Initialize reCAPTCHA using the global grecaptcha object
  const initializeRecaptcha = async () => {
    try {
      // Load reCAPTCHA script if not already loaded
      if (!window.grecaptcha) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://www.google.com/recaptcha/api.js';
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      // Clear previous widget if exists
      if (recaptchaWidgetId.current) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }

      // Create new reCAPTCHA
      recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainerRef.current, {
        sitekey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
        size: "normal",
        callback: (token) => {
          console.log("reCAPTCHA solved:", token);
          setRecaptchaReady(true);
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
          setRecaptchaReady(false);
        },
        'error-callback': () => {
          console.log("reCAPTCHA error");
          setRecaptchaReady(false);
        }
      });

      return true;
    } catch (error) {
      console.error("reCAPTCHA initialization failed:", error);
      return false;
    }
  };

  const sendOTP = async () => {
    if (!phone) {
      alert("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      // Initialize reCAPTCHA if not ready
      if (!recaptchaReady) {
        const success = await initializeRecaptcha();
        if (!success) throw new Error("reCAPTCHA initialization failed");
        
        // Wait for user to solve reCAPTCHA
        alert("Please complete the reCAPTCHA challenge");
        return;
      }

      // Get reCAPTCHA token
      const token = window.grecaptcha.getResponse(recaptchaWidgetId.current);
      if (!token) throw new Error("reCAPTCHA not completed");

      // Create custom verifier
      const verifier = {
        type: "recaptcha",
        verify: () => Promise.resolve(token)
      };

      // Send OTP
      confirmationResult.current = await signInWithPhoneNumber(
        auth,
        phone,
        verifier
      );
      
      setStep(2);
      setRecaptchaReady(false);
    } catch (error) {
      console.error("OTP send error:", error);
      alert(`Failed to send OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.current.confirm(otp);
      console.log("Authentication success:", result.user);
      alert("Phone authentication successful!");
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Phone Sign In</h2>
      
      {/* Visible reCAPTCHA container */}
      <div 
        ref={recaptchaContainerRef}
        style={{ margin: "20px 0", minHeight: "78px" }}
      ></div>

      {step === 1 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="tel"
            placeholder="+1 1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "10px" }}
          />
          <button 
            onClick={sendOTP} 
            disabled={loading}
            style={{ 
              padding: "10px", 
              background: loading ? "#ccc" : "#007bff", 
              color: "white" 
            }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="number"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "10px" }}
          />
          <button 
            onClick={verifyOTP} 
            disabled={loading}
            style={{ 
              padding: "10px", 
              background: loading ? "#ccc" : "#28a745", 
              color: "white" 
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
};