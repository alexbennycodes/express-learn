import express from "express";
import USER_DATA from "../data/USERS.json" assert { type: "json" };
import PRODUCTS_DATA from "../data/PRODUCTS.json" assert { type: "json" };

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.get("/users", (req, res) => {
  res.status(200).send(USER_DATA);
});

app.get("/users/:id", (req, res) => {
  const getUser = USER_DATA.find((user) => user.guid === req.params.id);
  if (getUser) res.status(200).send(getUser);
  else res.status(404).send({ message: "Not Found!" });
});

app.get("/products", (req, res) => {
  res.status(200).send(PRODUCTS_DATA);
});

app.get("/products/:id", (req, res) => {
  const getProduct = PRODUCTS_DATA.find(
    (product) => product.id === req.params.id
  );
  if (getProduct) res.status(200).send(getProduct);
  else res.sendStatus(404);
});
