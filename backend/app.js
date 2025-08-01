const express = require('express');
const cors = require('cors');
const assistantRoutes = require('./routes/assistant');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/assistant', assistantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
