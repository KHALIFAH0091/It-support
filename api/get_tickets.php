<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$ticketFile = __DIR__ . '/../data/tickets.json';

if (!file_exists($ticketFile)) {
    echo json_encode(['tickets' => []]);
    exit;
}

$data = json_decode(file_get_contents($ticketFile), true);
echo json_encode($data);
?>