var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");


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
    console.log("We made a connection");
   getProducts();
});

const start = function () {
    inquirer.prompt({
        name: "choices",
        type: "list",
        message: "What would you like to see?",
        choices: ["View products for sale....", "View Low inventory items....", "Add more stock to inventory....", "Add a new product", "Exit"]
    }).then(function (response) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        switch (response) {
            case "View products for sale....":
                getProducts();
                break;
            case "View Low inventory items....":
                lowInventory();
                break;
            case "Add more stock to inventory....":
                addInventory();
                break;
            case "Add a new product":
                addProduct();
                break;
            default:
                connection.end();
                break;
        }
    });
}

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
      start();
    });
  }