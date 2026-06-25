<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Read existing tickets
$ticketFile = __DIR__ . '/../data/tickets.json';
$data = json_decode(file_get_contents($ticketFile), true);

// Create new ticket
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $ticket = [
        'id' => uniqid('TKT-'),
        'subject' => $input['subject'] ?? '',
        'description' => $input['description'] ?? '',
        'category' => $input['category'] ?? '',
        'name' => $input['name'] ?? '',
        'email' => $input['email'] ?? '',
        'status' => 'open',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ];
    
    $data['tickets'][] = $ticket;
    
    // Save to file
    file_put_contents($ticketFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    
    echo json_encode(['success' => true, 'ticket' => $ticket]);
    exit;
}

// Get all tickets
echo json_encode($data);
?>