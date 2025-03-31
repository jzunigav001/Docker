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

    if (!isset($data['id'], $data['titulo'], $data['genero'], $data['precio'], $data['stock'])) {
        echo json_encode(["error" => "Datos incompletos"]);
        exit;
    }

    // Actualizar la película en la base de datos
    $stmt = $pdo->prepare("UPDATE peliculas SET titulo = ?, genero = ?, precio = ?, stock = ? WHERE id = ?");
    $stmt->execute([$data['titulo'], $data['genero'], $data['precio'], $data['stock'], $data['id']]);

    echo json_encode(["message" => "Película editada correctamente"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
