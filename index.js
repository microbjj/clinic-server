const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const requestRoutes = require('./routes/requests');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');


dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.json({message: true})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
