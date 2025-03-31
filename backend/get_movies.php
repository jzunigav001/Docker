<?php
header('Content-Type: application/json');

$host = "mysql-db";
$user = "user";
$password = "password";
$dbname = "blockbuster";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM peliculas");
    $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($movies);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
