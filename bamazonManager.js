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
    promptManager();
});

function promptManager() {
    inquirer.prompt([
        {
            name: "manChoice",
            type: "list",
            message: "Welcome Manager! What would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add Inventory", "Add a New Product"]
        }
    ]).then(function (answer) {
        switch (answer.manChoice) {
            case "View Products":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add Inventory":
                addInventory();
                break;

            case "Add a New Product":
                addNewProduct();
                break;
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptManager();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptManager();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What item would you like to restock? (enter item ID)"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much would you like to add?"
        }
    ]).then(function (ans) {
        connection.query("SELECT * FROM products WHERE id=" + ans.id, function (err, resp) {
            if (err) throw err;
            var newStock = resp[0].stock_quantity + parseInt(ans.quantity);
            connection.query("UPDATE products SET ? WHERE ?",
                { stock_quantity: newStock }, { id: ans.id },
                function (err, response) {
                    if (err) throw err;
                });
            console.log("\n" + resp[0].product_name + " has been updated and now has " + newStock + " in stock.");
        });
        promptManager();
    });
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What is the name of the product?"
        },
        {
            name: "department",
            type: "input",
            message: "What department does the product belong to?"
        },
        {
            name: "price",
            type: "input",
            message: "How much does the product cost?"
        },
        {
            name: "stock",
            type: "input",
            message: "How many units of the product do we stock?"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: response.product,
                department_name: response.department,
                price: response.price,
                stock_quantity: response.stock
            },
            function (err, res) {
                if (err) throw err;
            });
        console.log(response.product + " has been added to our product list");
        promptManager();
    })
}