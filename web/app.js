// Global variables
let client;
let currentFilter = 'all';

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize Supabase
    try {
        client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        showStatus('✓ Connected to Supabase', 'success');
    } catch (error) {
        showStatus('✗ Failed to connect to Supabase. Check config.js', 'error');
        console.error('Supabase error:', error);
        return;
    }

    // Load data
    loadCategories();
    loadTickets();
    setupFormListener();
    setupFilterButtons();
});

// Load categories from Supabase
async function loadCategories() {
    try {
        const { data, error } = await client
            .from('categories')
            .select('id, name')
            .order('id', { ascending: true });

        if (error) throw error;

        const select = document.getElementById('category');
        select.innerHTML = '<option value="">Select a category...</option>';

        if (data && data.length > 0) {
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        showStatus('Error loading categories', 'error');
    }
}

// Load and display all tickets
async function loadTickets() {
    try {
        let query = client
            .from('tickets')
            .select(`
                id,
                ticket_id,
                name,
                email,
                subject,
                description,
                status,
                created_at,
                categories(name)
            `)
            .order('created_at', { ascending: false });

        // Apply status filter
        if (currentFilter !== 'all') {
            query = query.eq('status', currentFilter);
        }

        const { data, error } = await query;

        if (error) throw error;

        const container = document.getElementById('ticketsContainer');

        if (!data || data.length === 0) {
            container.innerHTML = '<p>No tickets found.</p>';
            return;
        }

        container.innerHTML = data.map(ticket => `
            <div class="ticket-card">
                <div class="ticket-header">
                    <span class="ticket-id">${ticket.ticket_id}</span>
                    <span class="ticket-status status-${ticket.status}">${ticket.status.toUpperCase()}</span>
                </div>
                <div class="ticket-subject">${escapeHtml(ticket.subject)}</div>
                <div class="ticket-meta">
                    <strong>From:</strong> ${escapeHtml(ticket.name)} (${escapeHtml(ticket.email)})<br>
                    <strong>Category:</strong> ${ticket.categories ? ticket.categories.name : 'Unknown'}<br>
                    <strong>Created:</strong> ${formatDate(ticket.created_at)}
                </div>
                <div class="ticket-description">${escapeHtml(ticket.description)}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading tickets:', error);
        document.getElementById('ticketsContainer').innerHTML = '<p>Error loading tickets.</p>';
    }
}

// Setup form submission
function setupFormListener() {
    const form = document.getElementById('ticketForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await submitTicket();
    });
}

// Setup filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update filter and reload
            currentFilter = this.dataset.status;
            loadTickets();
        });
    });
}

// Submit new ticket
async function submitTicket() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        // Generate unique ticket ID
        const ticketId = 'TKT-' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

        const formData = {
            ticket_id: ticketId,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            category_id: parseInt(document.getElementById('category').value),
            subject: document.getElementById('subject').value,
            description: document.getElementById('description').value,
            status: 'open'
        };

        const { data, error } = await client
            .from('tickets')
            .insert([formData])
            .select();

        if (error) throw error;

        // Reset form
        document.getElementById('ticketForm').reset();
        showStatus('✓ Ticket submitted successfully! Ticket ID: ' + ticketId, 'success');

        // Reload tickets
        setTimeout(() => {
            loadTickets();
            // Scroll to tickets section
            document.querySelector('.tickets-section').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    } catch (error) {
        console.error('Error:', error);
        showStatus('✗ Error submitting ticket: ' + error.message, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Ticket';
    }
}

// Show status message
function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    statusEl.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            statusEl.style.display = 'none';
        }, 5000);
    }
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
