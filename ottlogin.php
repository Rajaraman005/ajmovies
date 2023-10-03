<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ott";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the submitted username and password
    $inputUsername = $_POST["username"];
    $inputPassword = $_POST["password"];

    // Create a database connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query to fetch the user with the provided username
    $sql = "SELECT username,password FROM reg WHERE username = '$inputUsername'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // User exists, now check the password
        $row = $result->fetch_assoc();
        $storedPassword = $row["password"];

        if (password_verify($inputPassword, $storedPassword)) {
            // Passwords match, login successful
            header("Location: index.html");
            // You can redirect the user to a dashboard or any other page here.
            exit;
        } else {
            // Passwords don't match, login failed
            echo "Invalid password!";
        }
    } else {
        // User doesn't exist
        echo "User not found!";
    }

    // Close the database connection
    $conn->close();
}
?>
