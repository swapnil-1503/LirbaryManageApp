// server.js
require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}...`);
});
