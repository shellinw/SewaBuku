const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const Controller = require("./Controller/controller");
const errorhandler = require("./errorHandler");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/books", Controller.getBuku);
app.post("/rent/:id", Controller.sewaBuku);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.use(errorhandler);
