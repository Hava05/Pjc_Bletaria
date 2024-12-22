<?php
// Include the database connection file
include '../db_connect.php';
include './profile.php';

// Set the appropriate response headers
header("Content-Type: application/json; charset=UTF-8");

// Fetch data
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

// Check for database errors
if ($conn->error) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database query failed: " . $conn->error]);
    $conn->close();
    exit;
}

// Check if there are any results
if ($result->num_rows > 0) {
    // Fetch data and return it as JSON
    $data = [];
    
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode(["success" => true, "data" => $data]);
} else {
    // Return an empty data array if no users are found
    echo json_encode(["success" => true, "data" => []]);
}

// Close connection
$conn->close();
?>
