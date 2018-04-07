var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Welcome to BAMazon!  Where products get to you so fast that it's a 'BAM!!'\n")
        console.table(res);
        purchase();
    });
}
function purchase() {
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "Which item would you like to buy? (use item ID)"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many of that item would you like to buy?"
        }
    ]).then(function (user) {
        connection.query("SELECT * FROM products WHERE id='" + user.productID + "'",
            function (err, response) {
                if (err) throw err;

                var resQuantity = response[0].stock_quantity;
                var buyQuantity = parseFloat(user.quantity);
                var newStock = resQuantity - buyQuantity;
                if (resQuantity < buyQuantity) {
                    console.log("We're out of stock!  Order less or order something else...");
                    purchase();
                }
                else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                id: user.productID
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Purchase made!  Your order will hit you with a BAM soon!");
                            console.log("Thanks for ordering with BAMazon!");
                        }
                    )
                    connection.end();
                }
            })
    });
}