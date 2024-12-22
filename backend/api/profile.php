<?php
    require_once '../../vendor/autoload.php'; 
    
    use \Firebase\JWT\JWT;
    use Dotenv\Dotenv;

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    // Secret key for JWT
    $secret_key = $_ENV['JWT_SECRET'];

    // Get the Authorization header
    $headers = apache_request_headers();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

    if (!$authHeader) {
        echo json_encode(["error" => "Authorization header not found."]);
        exit();
    }

    // The token is usually passed as "Bearer <token>"
    $jwt = str_replace("Bearer ", "", $authHeader);

    if (!$jwt) {
        echo json_encode(["error" => "JWT token missing."]);
        exit();
    }

    try {
        // Decode the JWT token
        $decoded = JWT::decode($jwt, 'HS256');

        // Use the decoded data (e.g., user ID) for further processing
        $userId = $decoded->sub;
        echo json_encode(["success" => "Token is valid.", "userId" => $userId]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Invalid token.", "message" => $e->getMessage()]);
        exit();
    }
?>
