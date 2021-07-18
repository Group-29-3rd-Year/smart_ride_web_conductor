const express = require("express");
const app =  express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

//register and login
app.use("/smartride", require("./routes/smartride"));

app.listen(5001, () => { 
    console.log("server is running on port 5001");
});