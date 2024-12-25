const express = require("express");
const app = express();
const port = 3000;
const Controller = require("./Controller/controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/books", Controller.getBuku);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
