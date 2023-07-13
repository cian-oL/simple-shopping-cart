# Shopping Cart App

Create a Simple Shopping Cart Using React and Node

A simple shopping cart app is built using React.js as the front-end framework, and a backend server built using Node.js and Express.js.

Source: https://dzone.com/articles/create-a-simple-shopping-cart-using-react-and-node
(credit to Georgre Anderson's tutorial)

## Server Description

This server.js file contains four routes:
1. An array of products loaded from the data.js module.
2. A post route that accepts a cart string, parses it, and generates the list products on the cart, along with their quantities.
3. A login route that authenticates the user and generates a JSON web token that is used to bypass the login middleware.
4. A GET route guarded by the middleware.js module.