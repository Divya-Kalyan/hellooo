const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build"))); // if React is built
app.get("/", (req, res) => {
  res.send("Backend running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Node.js server is running on http://localhost:${PORT}`);
});
