<?php
header('Content-Type: application/json');

$host = "mysql-db";
$user = "user";
$password = "password";
$dbname = "blockbuster";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si los datos fueron enviados
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['titulo'], $data['genero'], $data['precio'], $data['stock'])) {
        echo json_encode(["error" => "Datos incompletos"]);
        exit;
    }

    // Insertar en la base de datos
    $stmt = $pdo->prepare("INSERT INTO peliculas (titulo, genero, precio, stock) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['titulo'], $data['genero'], $data['precio'], $data['stock']]);

    echo json_encode(["message" => "Película agregada correctamente"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
