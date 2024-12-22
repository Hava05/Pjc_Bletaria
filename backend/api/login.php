<?php
// Include the Composer autoloader (for JWT)
    include '../db_connect.php';
    
    use \Firebase\JWT\JWT;
    use \Dotenv\Dotenv;

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    // Secret key for JWT
    $secret_key = $_ENV['JWT_SECRET'];

    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    // Ensure required fields are present
    if (!isset($data['email']) || !isset($data['password'])) {
        echo json_encode(["error" => "Email and password are required."]);
        exit();
    }

    // Sanitize inputs
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $password = trim($data['password']);

    // Check if email exists
    $stmt = $conn->prepare("SELECT id, fistname, lastname, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows == 0) {
        http_response_code(400);
        echo json_encode(["error" => "User not found."]);
        exit();
    }

    // Fetch user data
    $stmt->bind_result($id, $firstname, $lastname, $hashed_password);
    $stmt->fetch();

    // Verify password
    if (!password_verify($password, $hashed_password)) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid password."]);
        exit();
    }

    // User is authenticated, generate JWT
    $issued_at = time();
    $expiration_time = $issued_at + 3600;  // JWT will expire in 1 hour
    $payload = array(
        "iat" => $issued_at,
        "exp" => $expiration_time,
        "sub" => $id,  // User ID as subject of the token
        "firstname" => $firstname,
        "lastname" => $lastname
    );

    // Encode the JWT using the secret key
    $jwt = JWT::encode($payload, $secret_key,'HS256');

    // Return JWT to client
    echo json_encode(["success" => true, "token" => $jwt]);

    // Close statement and connection
    $stmt->close();
    $conn->close();
?>
