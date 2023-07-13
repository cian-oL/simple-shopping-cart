// BACKEND SERVER CONFIG

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data");
const { middleware } = require("./middleware");

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// list all available products
app.get("./api/products", (req, res) => {
    return res.json(data.products);
});

// generate product list in cart
app.post("./api/products", (req, res) => {
    const products = [];
    const cart = JSON.parse(req.body.cart);

    if (!cart) {
        return res.json(products);
    }
    for (let i = 0; i < data.products.length; i++) {
        let id = data.products[i].id.toString();
        if (cart.hasOwnProperty(id)) {
            data.products[i].qty = cart[id];
            products.push(data.products[i]);
        }
    }

    return res.json(products);
});

// sign user in
app.post("/api/auth", (req, res) => {
    const user = data.users.find((user) => {
        return user.name === req.body.name && user.password === req.body.password;
    });

    // create token with 2-hour validity
    if (user) {
        const tokenPayload = {
            name: user.name,
            password: user.password
        };
        const token = jwt.sign(tokenPayload, "jwt secret password", { expiresIn: "2h" });
        const response = {
            message: "Authentication successful; token created!",
            token
        }
        return res.status(200).json(response);
    } else {
        return res.status(401).json("Authentication failed; user not found");
    }
});

// checkout route for signed in users
app.get("/api/pay", middleware, (req, res) => {
    return res.json("Payment Successful");
});

// port
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});