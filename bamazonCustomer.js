var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var chalk = require("chalk");
var table = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  getProducts();
});

function getProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    const products = res.map(product => Object.values(product).map(item => chalk.blue(item)));

    console.table(Object.keys(res[0]).map(item => chalk.green(item)), products);


    // for (var i = 0; i < res.length; i++) {
    //   console.log("Product ID: " + res[i].item_id + " || Product Name: " +
    //     res[i].product_name + " || Price: " + res[i].price);
    // }
    requestProduct();
  });
}

var requestProduct = function () {
  inquirer.prompt([{
    name: "productID",
    type: "input",
    message: "Please enter product ID for product you want.",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }, {
    name: "productUnits",
    type: "input",
    message: "How many units do you want?\n",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false
    }
  }]).then(function (answer) {

    // Queries database for selected product.
    var query = "Select stock_quantity, price, department_name FROM products WHERE ?";
    connection.query(query, { item_id: answer.productID }, function (err, res) {

      if (err) throw err;

      var available_stock = res[0].stock_quantity;
      var price_per_unit = res[0].price;
      var productDepartment = res[0].department_name;

      // Checks there's enough inventory  to process user's request.
      if (available_stock >= answer.productUnits) {

        // Processes user's request passing in data to complete purchase.
        completePurchase(available_stock, price_per_unit, productDepartment, answer.productID, answer.productUnits);
      } else {

        // Tells user there isn't enough stock left.
        if (available_stock === 0) {

          console.log(chalk.red("There isn't enough stock on hand!"));
          console.log(chalk.red("Products are on backorder...please check with us again"));
        } else {
          console.log(chalk.red("We only have " + available_stock + " left in stock"));

        }
        // Lets user request a new product.
        requestProduct();
      }
    });
  });
};

var completePurchase = function (availableStock, price, productDepartment, selectedProductID, productUnits) {

  var updatedStock = availableStock - productUnits;
  var totalPrice = price * productUnits;

  var query = "UPDATE products SET ? WHERE ?";

  connection.query(query, [{
    stock_quantity: updatedStock
  }, {
    item_id: selectedProductID
  }], function (err, res) {

    if (err) throw err;
    // Tells user purchase is a success.
    console.log(chalk.yellow("Your total price for this purchase is $"+ totalPrice));

    inquirer
      .prompt([
        {
          type: "list",
          message: "Would you like to continue with purchase?",
          choices: ["Yes", "No"],
          name: "action"
        }
      ])
      .then(answers => {
        if (answers.action === "Yes") {
          console.log(chalk.green("Yay, your purchase is complete."));
          console.log(chalk.green("You're  payment has been received for the amount of $"+ totalPrice));
          console.log(chalk.green("Thanks for shopping with us! Come again real soon!"));

        } else {
          inquirer
            .prompt([
              {
                type: "list",
                message: "Would you like to purchase more items?",
                choices: ["Yes", "No"],
                name: "action"
              }
            ])
            .then(answers => {
              if (answers.action === "Yes") {
                getProducts();
                requestProduct();

              } else {
                console.log("Come again real soon!");
                connection.end();
              }
            });

        }
      });


  });
};






