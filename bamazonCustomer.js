var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "iamroot",
  password: "Morristown93*",
  database: "bamazon"
});

var productsArray= [];

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, products) {
    console.log("-----------------------------------");
 
    if (err) throw err;
    // console.log(products);
    productsArray = products;
    for (var i = 0; i < products.length; i++) {
      console.log(products[i].item_id + " | " + products[i].product_name + " | " + products[i].department_name + " | " + "$" + products[i].item_price + " | " + products[i].stock_quantity + " in stock");
    }
    console.log("-----------------------------------");
    	console.log("Please select an item by typing its ID number.");

    connection.end();
  });
}
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
askId();

function askId(){
	inquirer.prompt([
		{
			name: "item_id",
			message: "Order: (by item ID no.)",
			type: "input",
			validate: function validateName(name) {
				
				var reg = /^\d+$/;
				return reg.test(name) || "should be a number";
		    
 			 }
		}, 
	]).then(answers => { //ONCE THE USER SELECTS, DO THIS:
		
		var indexNumber = answers.item_id - 1;
		console.log(indexNumber);
		console.log("You Selected: " + productsArray[indexNumber].item_id + " | " + productsArray[indexNumber].product_name + 
			" | " + productsArray[indexNumber].department_name + " | " + "$" + productsArray[indexNumber].item_price + 
			" | " + productsArray[indexNumber].stock_quantity + " in stock");

	inquirer.prompt([
		{ name: "stock_quantity",
		message: "Enter the number of items you would want to order",
		type: "input",
		validate: function validateName(name) {
				var reg = /^\d+$/;
				return reg.test(name) || "should be a number";
 		}
	}
	]).then(answers => {
    console.log(answers);
	function checkStock(){
		if (answers.item_id + answers.stock_quantity < 1){
			
			console.log("out of stock!");
		}
		else{
			console.log("in stock");
			inquirer.prompt([
				{ name:"name",
				message: "Order this item?",
				type: 'confirm' }
				]).then(answers => {

			function updateStock() {
			  console.log("Updating...\n");
			  var query = connection.query(
			    "UPDATE products SET product_name WHERE stock_quantity",
			    [
			      {
			        stock_quantity: answers.stock_quantity  - productsArray[indexNumber].stock_quantity
			      },
			      {
			        product_name: productsArray[indexNumber]
			      }
			    ],
			     function(err, res) {
     			console.log("You ordered a " + productsArray[indexNumber].product_name);
   				 }
			  );
			  console.log(query.sql);
			}
			updateStock();
		});
		}
	}
	checkStock();

	});

});
console.log("Please select an item by typing its ID number.");
}
