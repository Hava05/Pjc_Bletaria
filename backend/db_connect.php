<?php
  require_once '../../vendor/autoload.php'; 
  use \Dotenv\Dotenv;

  $dotenv = Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  $db_host = $_ENV['DB_HOST'];
  $db_username = $_ENV['DB_USERNAME'];
  $db_password = $_ENV['DB_PASSWORD'];
  $db_name = $_ENV['DB_NAME'];

  // Create connection
  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
?>