// src/socket.js
import { io } from "socket.io-client";
import { handleSesssionStorage } from "./utils/helperFunction";
import { ADMIN_BASE_URL } from "./redux/api/configURL";

const SERVER_URL = ADMIN_BASE_URL 


// Get JWT token from sessionStorage or localStorage
const token = handleSesssionStorage("get", "token")// or localStorage.getItem("access_token")

// Initialize Socket.IO connection
const socket = io(SERVER_URL, {
    transports: ["websocket"],
    auth: {
        token: `Bearer ${token}`, // pass token as Bearer
    },
    reconnectionAttempts: 5, // retry if connection drops
    autoConnect: true,
});

// Logging connection status
socket.on("connect", () => {
    console.log("✅ Connected to WebSocket, socket ID:", socket.id);
});

socket.on("disconnect", (reason) => {
    console.warn("⚠️ Disconnected from WebSocket:", reason);
});

socket.on("connect_error", (err) => {
    console.error("❌ WebSocket connection error:", err.message);
});

export default socket;
