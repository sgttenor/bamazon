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
function start(){
    inquirer.prompt([{
      type: "list",
      name: "doThing",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
    }]).then(function(ans){
       switch(ans.doThing){
        case "View Products for Sale": viewProducts();
        break;
        case "View Low Inventory": viewLowInventory();
        break;
        case "Add to Inventory": addToInventory();
        break;
        case "Add New Product": addNewProduct();
        break;
        case "End Session": console.log('Bye!');
      }
    });
  }
  
  //views all inventory
  function viewProducts(){
    console.log('>>>>>>Viewing Products<<<<<<');
  
    connection.query('SELECT * FROM Products', function(err, res){
        if (err) throw err;

        const products = res.map(product => Object.values(product).map(item => chalk.blue(item)));
    
        console.table(Object.keys(res[0]).map(item => chalk.green(item)), products);
    
  
    start();
    });
  }
  
  //views inventory lower than 5
  function viewLowInventory(){
    console.log('>>>>>>Viewing Low Inventory<<<<<<');
  
    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<res.length;i++){
      if(res[i].stock_quantity <= 5){
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------');
      }
    }
  
    start();
    });
  }
  
  //displays prompt to add more of an item to the store and asks how much
  function addToInventory(){
    console.log('>>>>>>Adding to Inventory<<<<<<');
  
    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    var itemArray = [];
    //pushes each item into an itemArray
    for(var i=0; i<res.length; i++){
      itemArray.push(res[i].product_name);
    }
  
    inquirer.prompt([{
      type: "list",
      name: "product",
      choices: itemArray,
      message: "Which item would you like to add inventory?"
    }, {
      type: "input",
      name: "qty",
      message: "How much would you like to add?",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
      }]).then(function(ans){
        var currentQty;
        for(var i=0; i<res.length; i++){
          if(res[i].product_name === ans.product){
            currentQty = res[i].stock_quantity;
          }
        }
        connection.query('UPDATE Products SET ? WHERE ?', [
          {stock_quantity: currentQty + parseInt(ans.qty)},
          {product_name: ans.product}
          ], function(err, res){
            if(err) throw err;
            console.log('The quantity was updated.');
            start();
          });
        })
    });
  }
  
  //allows manager to add a completely new product to store
  function addNewProduct(){
    console.log('>>>>>>Adding New Product<<<<<<');
    var deptNames = [];
  
    //grab name of departments
    connection.query('SELECT * FROM products WHERE department_name', function(err, res){
      if(err) throw err;
      for(var i = 0; i<res.length; i++){
        deptNames.push(res[i].department_name);
      }
    })
  
    inquirer.prompt([{
      type: "input",
      name: "product",
      message: "Product: ",
      validate: function(value){
        if(value){return true;}
        else{return false;}
      }
    }, {
      type: "list",
      name: "department",
      message: "Department: ",
      choices: ["Board-Games", "Video-Games", "Movies"]
    }, {
      type: "input",
      name: "price",
      message: "Price: ",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "quantity",
      message: "Quantity: ",
      validate: function(value){
        if(isNaN(value) == false){return true;}
        else{return false;}
      }
    }]).then(function(ans){
      connection.query('INSERT INTO Products SET ?',{
        product_name: ans.product,
       department_name: ans.department,
        Price: ans.price,
        stock_quantity: ans.quantity
      }, function(err, res){
        if(err) throw err;
        console.log("Another item was added to the store.\n\n");
      })
      start();
    });
  }
  
  start();
  