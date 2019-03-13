var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    //my port
    port: 3306,
    //username
    user: "root",
    //your password
    password: 'Jim!2018',
    database: "bamazon"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});
//prompt
inquirer.prompt([
    {
        type: "input",
        name: "productId",
        message: "Please enter the ID of the product you would like to buy?",
    },
    {
        type: "input",
        name: "productUnits",
        message: "How many units would you like."
    },

])
    .then(function (answer) {
        var itemToBuy = answer.productId;

        var qty = parseInt(answer.productUnits);

        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: itemToBuy }, function (err, res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("invalid ID, Please enter a valid Item ID number.");
                readProducts();
            } else {
                var itemData = res[0];

                console.log("You have selected to purchase " + qty);
                console.log(itemData.product_name);
                console.log("from the " + itemData.department_name + " department.");
                if (itemData.stock_quantity < qty) {
                    console.log("There are not enough in stock for that transaction");
                    exitStrategy();
                }
                else {
                    var amtRemaining = itemData.stock_quantity - qty;
                    var itemData = res[0];

                    console.log("There are now " + amtRemaining + " " + itemData.product_name + " remaining.");
                    console.log("Your total is: $" + (qty * itemData.price));
                    var updateQuery = "UPDATE products SET stock_quantity  = " + amtRemaining + ' WHERE item_id = ' + itemToBuy;
                    
                    connection.query(updateQuery, function (err, res) {
                        if (err) throw err;
                   exitStrategy();
                       // console.log("Available Products At G's BAMAZON STORE");
                        //Log all results of the Select statement
                        // for (var i = 0; i < res.length; i++) {
                        //     var productData = res[i];
                        //     console.table("Item ID: " + productData.item_id);
                        //     console.table("Product Name: " + productData.product_name);
                        //     console.table("Available Quantity: " + productData.stock_quantity);
                        //     console.table("Price: " + productData.price);
                        //     console.log("-----------------------------------------------------------------------");
                            
                        // }
                    })

                    }
                }
            })
        })

        function exitStrategy() {

            connection.end();
        }

        function readProducts() {
            console.log("Selecting all products...\n");
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.log("Available Products At G's BAMAZON STORE");
                //Log all results of the Select statement
                for (var i = 0; i < res.length; i++) {
                    var productData = res[i];
                    console.table("Item ID: " + productData.item_id);
                    console.table("Product Name: " + productData.product_name);
                    console.table("Available Quantity: " + productData.stock_quantity);
                    console.table("Price: " + productData.price);
                    console.log("-----------------------------------------------------------------------");
                }
            });
        }


