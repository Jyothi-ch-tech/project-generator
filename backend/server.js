const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/project", projectRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
