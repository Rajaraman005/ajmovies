<?php
// Database connection settings
$host = 'localhost'; // Usually 'localhost'
$username = 'root';
$password = '';
$database = 'ott';

// Establish database connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Function to sanitize user input
function sanitize_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Check if the registration form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input from the registration form
    $username = sanitize_input($_POST["username"]);
    $email = sanitize_input($_POST["email"]);
    $phoneno = sanitize_input($_POST["phone"]);
    $password = sanitize_input($_POST["password"]);
    $confirm_password = sanitize_input($_POST["confirm_password"]);

    // Check if the password and confirm password match
    if ($password !== $confirm_password) {
        echo "Error: Password and Confirm Password do not match.";
        exit(); // Stop further execution if passwords don't match
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare the SQL query to insert user data into the database
    $sql = "INSERT INTO reg (username, email, phoneno, password) VALUES ('$username', '$email', '$phoneno', '$hashed_password')";

    // Execute the query
    if (mysqli_query($conn, $sql)) {
        // Registration successful
        header("Location: index.html");
        // You can redirect the user to the login page or any other page after successful registration.
    } else {
        // Registration failed
        echo "Error: " . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
}
?>