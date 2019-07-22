var mysql = require("mysql");
var inquirer = require("inquirer");

// Global variables
var itemId = 0;
var newQuantity = 0;

//Connection 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mickey08!",
    database: "bamazon_db"
});

// Uses connection to link to MySQL DB -- shows available products
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    availableItems();
});

// Creates a function to show the available items
function availableItems() {
    console.table("Available items on Bamazon...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results
      console.log(res);
      inquirer.prompt ([
        {
          type: "input",
          name: "id",
          message: "What is the id of the item you'd like to purchase?"
        },
        {
          type: "input",
          name: "quantity",
          message: "How many units would you like to purchase?"
        }
      ]).then(function(answers){
        var itemId = parseFloat(answers.id);
        console.log("ID chosen: " + itemId);
        var originalQuantity = parseFloat(answers.quantity);
        console.log("You chose " + itemQuantity + " units for purchase");
        
        // Function to verify if selected number of units are available
        connection.query("SELECT stock_quantity FROM products WHERE item_id=?", [itemId], function(err, res){
          if(err)throw(err);
          var itemAvailability = res[0].stock_quantity;
          if(itemAvailability >= originalQuantity){
            console.log("Order status: Accepted");
            var newQuantity = itemAvailability - originalQuantity;
          }else{
            console.log("Order status: Unable to Process. Unable to complete order as there are only " + itemAvailability + " available");
            connection.end();
            return;
          };
          connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newQuantity, itemId], function(err, res){
            if(err) throw(err);
            console.log("\n\n Stock updated!");
          });
          connection.end();
        })
      })
    });
}