// API endpoints
const API_BASE = './api';

// Load categories on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadTickets();
    setupFormListener();
});

// Load categories from JSON
function loadCategories() {
    fetch(`${API_BASE}/get_categories.php`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('category');
            if (data.categories) {
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    select.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error loading categories:', error));
}

// Load and display all tickets
function loadTickets() {
    fetch(`${API_BASE}/get_tickets.php`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('ticketsContainer');
            
            if (!data.tickets || data.tickets.length === 0) {
                container.innerHTML = '<p>No tickets yet. Submit one to get started!</p>';
                return;
            }

            // Sort tickets by date (newest first)
            const tickets = data.tickets.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            );

            container.innerHTML = tickets.map(ticket => `
                <div class="ticket-card">
                    <div class="ticket-header">
                        <span class="ticket-id">${ticket.id}</span>
                        <span class="ticket-status status-${ticket.status}">${ticket.status.toUpperCase()}</span>
                    </div>
                    <div class="ticket-subject">${escapeHtml(ticket.subject)}</div>
                    <div class="ticket-meta">
                        <strong>From:</strong> ${escapeHtml(ticket.name)} (${escapeHtml(ticket.email)})
                        <br>
                        <strong>Created:</strong> ${new Date(ticket.created_at).toLocaleString()}
                    </div>
                    <div class="ticket-description">${escapeHtml(ticket.description)}</div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading tickets:', error);
            document.getElementById('ticketsContainer').innerHTML = '<p>Error loading tickets.</p>';
        });
}

// Setup form submission
function setupFormListener() {
    const form = document.getElementById('ticketForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitTicket();
    });
}

// Submit new ticket
function submitTicket() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        category: document.getElementById('category').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value
    };

    fetch(`${API_BASE}/create_ticket.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset form
            document.getElementById('ticketForm').reset();
            
            // Show success message
            showMessage('Ticket submitted successfully! Ticket ID: ' + data.ticket.id, 'success');
            
            // Reload tickets
            setTimeout(loadTickets, 1000);
        } else {
            showMessage('Error submitting ticket.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Error submitting ticket.', 'error');
    });
}

// Show message
function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `${type}-message`;
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    
    const form = document.getElementById('ticketForm');
    form.parentElement.insertBefore(messageEl, form);
    
    setTimeout(() => messageEl.remove(), 5000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}