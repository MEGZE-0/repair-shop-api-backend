const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

dotenv.config();
const app = express();

// Function to generate a random JWT secret
const generateJwtSecret = () => {
    return crypto.randomBytes(512).toString('hex');
};

// Ensure JWT_SECRET is in .env file
const envFilePath = path.join(__dirname, '.env');
if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, 'JWT_SECRET=' + generateJwtSecret() + '\n');
} else {
    const envContent = fs.readFileSync(envFilePath, 'utf8');
    if (!envContent.includes('JWT_SECRET=')) {
        fs.appendFileSync(envFilePath, 'JWT_SECRET=' + generateJwtSecret() + '\n');
    }
}

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/devices', require('./routes/deviceRoutes'));
app.use('/api/repairs', require('./routes/repairRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
