/**
 * BACKEND API CONFIGURATION
 * 
 * Change this single URL based on where your backend is running:
 * 
 * For Local Development (same machine):
 *   - iOS Simulator: http://172.20.10.3:8000
 *   - Android Emulator: http://172.20.10.3:8000 (your computer's IP)
 *   - Physical Device: http://172.20.10.3:8000 (your computer's IP)
 *   - Web: http://localhost:8000
 * 
 * For Remote Server:
 *   - Use your server's public IP or domain
 * 
 * TO FIND YOUR COMPUTER'S IP:
 * Mac/Linux: Run in terminal: ifconfig | grep "inet " | grep -v 127.0.0.1
 * Windows: Run in terminal: ipconfig
 */

// 🔧 CHANGE THIS TO YOUR BACKEND URL
const BACKEND_URL = "http://172.20.10.3:8000";  // Your computer's IP on the network

// Alternatively, if using web/localhost:
// const BACKEND_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  HEALTH: `${BACKEND_URL}/`,
  PREDICT_QUALITY: `${BACKEND_URL}/predict_quality`,
  PREDICT_WITHERING: `${BACKEND_URL}/predict_withering`,
};

export default BACKEND_URL;
