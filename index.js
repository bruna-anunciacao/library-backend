const express = require('express');
const cors = require('cors');
// Import routes

// App config
const app = express();
const sequelize = require('./db/conn')

// Middlewares
app.use(express.json());
app.use(cors())


const port = process.env.PORT || 3000;
sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on ${port} port`);
        });
    }).catch((err) => console.log(err));