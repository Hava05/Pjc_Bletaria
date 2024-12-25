<?php
  include '../db_connect.php';
  include './profile.php';

  // Get data from POST request
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {

       // Sanitize inputs
      $f = $conn->real_escape_string($_POST['firstname']);
      $l = $conn->real_escape_string($_POST['lastname']);
      $e = $conn->real_escape_string($_POST['email']);
      $p = $conn->real_escape_string($_POST['password']);

      // Sanitize inputs
      $firstname = trim($f);
      $lastname = trim($l);
      $email = trim($e);
      $password = trim($p);

      // Validate email format
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid email format."]);
        exit();
      }

      // Sanitize the email and name
      $email = filter_var($email, FILTER_SANITIZE_EMAIL);

      // Check if username or email already exists (using parameterized queries)
      $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
      $stmt->bind_param("s", $email);
      $stmt->execute();
      $stmt->store_result();
      if ($stmt->num_rows > 0) {
        http_response_code(401);
        echo json_encode(["error" => "email already taken."]);
        exit();
      }
 
      // Hash the password securely
      $hashed_password = password_hash($password, PASSWORD_BCRYPT);

      // Insert new user into the database (again using parameterized queries)
      $stmt = $conn->prepare("INSERT INTO users (fistname,lastname, email, password) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("ssss", $firstname,$lastname, $email, $hashed_password);
      
      if ($stmt->execute()) {
          echo json_encode(["success" => true]);
      } else {
        http_response_code(400);
        echo json_encode(["error" => "Error registering user."]);
      }

      // Close the statement
      $stmt->close();
  }

  // Close the connection
  $conn->close();
?>
