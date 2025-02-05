require("dotenv").config();
const axios = require("axios");

// Load Google API credentials from .env file
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;  // Set this in your .env file
const FILE_ID = "your_file_id_here"; // Replace with the actual Google Drive file ID
const NEW_OWNER_EMAIL = "newowner@example.com"; // Replace with the recipient's email

// Function to transfer file ownership
async function transferOwnership() {
    try {
        // Step 1: Add New Owner
        const addOwnerResponse = await axios.post(
            `https://www.googleapis.com/drive/v3/files/${FILE_ID}/permissions`,
            {
                role: "owner",
                type: "user",
                emailAddress: NEW_OWNER_EMAIL,
                pendingOwner: true // Requires recipient to accept ownership transfer
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Ownership transfer initiated:", addOwnerResponse.data);
    } catch (error) {
        console.error("Error transferring ownership:", error.response ? error.response.data : error.message);
    }
}

// Call the function
transferOwnership();
