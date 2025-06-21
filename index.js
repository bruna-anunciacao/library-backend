const express = require("express");
const cors = require("cors");
// Import routes
const userRoutes = require("./router/user");
const bookRoutes = require("./router/book");
const exemplaryRoutes = require("./router/exemplary");
// App config
const app = express();
const { sequelize } = require("./models/index.js");

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", userRoutes);
app.use("/book", bookRoutes);
app.use("/exemplary", exemplaryRoutes);
// DB config
const port = process.env.PORT || 3000;
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port} port`);
    });
  })
  .catch((err) => console.log(err));
