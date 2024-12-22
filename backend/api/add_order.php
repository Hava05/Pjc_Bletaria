<?php
  // Include the database connection file
  include "../db_connect.php";
  include './profile.php';

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate and sanitize POST data
    $FIRST_NAME = $conn->real_escape_string($_POST['firstname']);
    $LAST_NAME = $conn->real_escape_string($_POST['lastname']);
    $ADDRESS = $conn->real_escape_string($_POST['address']);
    $TEL = $conn->real_escape_string($_POST['tel']);
    $TYPE = $conn->real_escape_string($_POST['type']);
    $QUANTITY = intval($_POST['quantity']); // Ensure quantity is an integer

    // Prepare the SQL query using placeholders to prevent SQL injection
    $sql = "INSERT INTO orders (firstname, lastname, address, tel, type, quantity) 
            VALUES (?, ?, ?, ?, ?, ?)";

    // Use a prepared statement to execute the query
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Failed to prepare the query: " . $conn->error]);
        exit;
    }

    // Bind parameters to the query
    $stmt->bind_param("sssssi", $FIRST_NAME, $LAST_NAME, $ADDRESS, $TEL, $TYPE, $QUANTITY);

    // Execute the query
    if ($stmt->execute()) {
        // Query executed successfully
        echo json_encode(["success" => true]);
    } else {
        // Query execution failed
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Execution failed: " . $stmt->error]);
    }

        // Close the statement and connection
    $stmt->close();
  }

  $conn->close();
?>
