import express from "express";
import USER_DATA from "../data/USERS.json" assert { type: "json" };
import PRODUCTS_DATA from "../data/PRODUCTS.json" assert { type: "json" };

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello, world!" });
});

app.get("/users", (req, res) => {
  res.status(201).send(USER_DATA);
});

app.get("/products", (req, res) => {
  res.status(201).send(PRODUCTS_DATA);
});
