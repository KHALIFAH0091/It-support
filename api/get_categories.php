<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$categoryFile = __DIR__ . '/../data/categories.json';

if (!file_exists($categoryFile)) {
    echo json_encode(['categories' => []]);
    exit;
}

$data = json_decode(file_get_contents($categoryFile), true);
echo json_encode($data);
?>