const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const port = 5000;
const {
  createUserQuery
} = require("./sql/user.sql");
const {
  createClientQuery
} = require("./sql/client.sql");
const {executeQuery} = require("./db")

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create all requirement tables
async function createAllTables(){
  try {
    await executeQuery(createUserQuery);
    await executeQuery(createClientQuery);
  } catch (error) {
    console.log("Error occoured while createing table",error.message);
  }
}
createAllTables();


// routes
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/client",require("./routes/client.routes"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
