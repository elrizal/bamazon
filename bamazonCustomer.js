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
				console.log(name);
				var reg = /^\d+$/;
				return reg.test(name) || "should be a number";
		    
 			 }
		}, 
	]).then(answers => { //ONCE THE USER SELECTS, DO THIS:
		console.log(answers);
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
				console.log(name);
				var reg = /^\d+$/;
				return reg.test(name) || "should be a number";
 		}
	}
	]).then(answers => {
    console.log(answers);
	function checkStock(){
		if (answers.item_id > answers.stock_quantity){
			//if the user's order qu is more than the quant
			console.log("out of stock!");
			
			//prevent user from going further
		}
		else{
			console.log("in stock");
			inquirer.prompt([
				{ name:"name",
				message: "Order this item?",
				type: 'confirm' }
				]).then(answers => {
   				console.log("You ordered " + productsArray[indexNumber].product_name );
	   			connection.connect(function(err) {
				  if (err) throw err;
				  var sql = `UPDATE products SET item_id = ${productsArray[indexNumber].item_id} WHERE stock_quantity = ${productsArray[indexNumber].stock_quantity}`;

				 connection.query(sql, function (err, result) {
				    if (err) throw err;
				    console.log(result.affectedRows + " record(s) updated");
				  });
				});

		});
		}
		//****function to change the database info
	}
	checkStock();
});

		
 // Once the customer has placed the order, your application should 
// check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

});
		console.log("Please select an item by typing its ID number.");

}
