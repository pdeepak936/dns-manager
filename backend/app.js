const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const dnsRoutes = require('./routes/dnsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/dns', dnsRoutes);
app.use('/api/auth', authRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
