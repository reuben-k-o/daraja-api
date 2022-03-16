const express = require("express");
const app = express();

const PORT = process.env.PORT || 9000;

// Request Body Middleware
app.use(express.json({ extended: true }));

// Routes
app.use("/api/lnm", require("./routes/lnm"));
app.use("/api/c2b", require("./routes/c2b"));

app.listen(PORT, err => {
  if (err) console.error(err.message);
  console.log(`Server running on port ${PORT}... Press Ctrl + C to terminate.`);
});
