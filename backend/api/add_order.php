<?php
  // Include the database connection file
  include "../db_connect.php";

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate and sanitize POST data
    $FIRST_NAME = $conn->real_escape_string($_POST['firstname']);
    $LAST_NAME = $conn->real_escape_string($_POST['lastname']);
    $ADDRESS = $conn->real_escape_string($_POST['address']);
    $TEL = $conn->real_escape_string($_POST['tel']);
    $TYPE = $conn->real_escape_string($_POST['type']);
    $QUANTITY = intval($_POST['quantity']); // Ensure quantity is an integer

    if (empty($FIRST_NAME) || empty($LAST_NAME) || empty($ADDRESS) || empty($TEL)|| empty($TYPE) || empty($QUANTITY)) {
        echo json_encode(["error" => "All fields are required."]);
        exit();
    }

    // Prepare the SQL query using placeholders to prevent SQL injection
    $sql = "INSERT INTO orders (firstname, lastname, address, tel, type, quantity) 
            VALUES (?, ?, ?, ?, ?, ?)";

    // Use a prepared statement to execute the query
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
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
        echo json_encode(["success" => false, "error" => "Execution failed: " . $stmt->error]);
    }

        // Close the statement and connection
    $stmt->close();
  }

  $conn->close();
?>
