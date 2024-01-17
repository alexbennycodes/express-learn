import express from "express";
import USER_DATA from "../data/USERS.json" assert { type: "json" };
import PRODUCTS_DATA from "../data/PRODUCTS.json" assert { type: "json" };

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

function filterUserData(users, filter, value) {
  const lowerValue = value.toLowerCase();
  return users.filter((user) => {
    const userValue = user[filter].toLowerCase();

    if (filter === "gender") {
      return userValue === lowerValue;
    } else {
      return userValue.includes(lowerValue);
    }
  });
}

app.get("/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  if (!filter || !value) res.status(200).send(USER_DATA);
  else if (filter in USER_DATA[0])
    res.status(200).send(filterUserData(USER_DATA, filter, value));
  else res.status(404).send({ message: `"${filter}" filter does not exist` });
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const newUser = { id: USER_DATA.length + 1, ...req.body };
  USER_DATA.push(newUser);
  return res.status(200).send(newUser);
});

app.get("/users/:id", (req, res) => {
  const getUser = USER_DATA.find((user) => user.guid === req.params.id);
  if (getUser) res.status(200).send(getUser);
  else res.status(404).send({ message: "Not Found!" });
});

app.get("/products", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  if (!filter || !value) res.status(200).send(PRODUCTS_DATA);
  else if (filter in PRODUCTS_DATA[0])
    res.status(200).send(filterUserData(PRODUCTS_DATA, filter, value));
  else res.status(404).send({ message: `"${filter}" filter does not exist` });
});

app.get("/products/:id", (req, res) => {
  const getProduct = PRODUCTS_DATA.find(
    (product) => product.id === req.params.id
  );
  if (getProduct) res.status(200).send(getProduct);
  else res.sendStatus(404);
});
