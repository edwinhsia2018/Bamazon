var mysql = require("mysql");
var inquirer = require("inquirer");

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
        console.log("Welcome to BAMazon!  Where products get to you so fast that it's a 'BAM!!'")
        console.log("********************************************");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Stock: " + res[i].stock_quantity);
        }
        console.log("********************************************");
        connection.end();
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
        connection.query("SELECT * FROM products WHERE id=?",
            {
                id: user.productID
            },
            function (err, bam) {
                if (err) throw err;
            })
        if (bam.quantity < user.stock_quantity) {

            console.log("We're out of stock!  Order less or order something else...");
            purchase();
        }
        else {
            var stockQuantity = parseInt(bam.stock_quantity - user.quantity);
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: stockQuantity
                    },
                    {
                        id: user.productID
                    }
                ],
                function (err) {
                    if (error) throw error;
                    console.log("Purchase made!  Your order will hit you with a BAM soon!");
                    console.log("Thanks for ordering with BAMazon!");
                }
            )
            connection.end();
        }
    })
}