<?php
header('Content-Type: application/json');

$host = "mysql-db";
$user = "user";
$password = "password";
$dbname = "blockbuster";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener datos JSON enviados desde JavaScript
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
        echo json_encode(["error" => "ID de película no proporcionado"]);
        exit;
    }

    // Eliminar la película en la base de datos
    $stmt = $pdo->prepare("DELETE FROM peliculas WHERE id = ?");
    $stmt->execute([$data['id']]);

    echo json_encode(["message" => "Película eliminada correctamente"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
