const express = require("express");
const app = express();

const lnmRoutes = require("./routes/lnm");
const c2bRoutes = require("./routes/c2b");

// Request Body Middleware
app.use(express.json({ extended: true }));

// Routes
app.use("/api/lnm", lnmRoutes);
app.use("/api/c2b", c2bRoutes);

app.listen(9000);
