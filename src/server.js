const dns = require('dns');
const dotenv = require('dotenv');

// 1. MUST BE FIRST
dotenv.config(); 
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 2. Connect to DB
mongoose.connect(process.env.MONGO_URI || "your_backup_string_here")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// 3. IMPORTANT: Move these BELOW dotenv.config()
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));