/**
 * Kaziranga Booking API - Admin JavaScript
 */
(function($) {
    'use strict';

    let currentPage = 1;
    let currentBookingId = null;
    let totalPages = 1;

    $(document).ready(function() {
        loadBookings();
        bindEvents();
    });

    function bindEvents() {
        // Refresh button
        $('#kba-refresh').on('click', function() {
            currentPage = 1;
            loadBookings();
        });

        // Search input
        let searchTimeout;
        $('#kba-search').on('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                currentPage = 1;
                loadBookings();
            }, 500);
        });

        // Status filter
        $('#kba-status-filter').on('change', function() {
            currentPage = 1;
            loadBookings();
        });

        // Modal close
        $('.kba-modal-close').on('click', function() {
            closeModal();
        });

        $(document).on('click', '.kba-modal', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // View booking
        $(document).on('click', '.kba-view-btn', function() {
            const bookingId = $(this).data('id');
            viewBooking(bookingId);
        });

        // Delete booking
        $(document).on('click', '.kba-delete-btn', function() {
            const bookingId = $(this).data('id');
            if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
                deleteBooking(bookingId);
            }
        });

        // Update status
        $('#kba-update-status').on('click', function() {
            const status = $('#kba-status-update').val();
            updateBookingStatus(currentBookingId, status);
        });

        // Delete from modal
        $('#kba-delete-booking').on('click', function() {
            if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
                deleteBooking(currentBookingId);
            }
        });

        // Settings form
        $('#kba-settings-form').on('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }

    function loadBookings() {
        const search = $('#kba-search').val();
        const status = $('#kba-status-filter').val();

        $.ajax({
            url: kbaApi.root + 'kaziranga-booking/v1/bookings',
            method: 'GET',
            data: {
                page: currentPage,
                per_page: 20,
                search: search,
                status: status
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
            },
            success: function(response) {
                if (response.success) {
                    renderBookings(response.data);
                    renderPagination(response.total_pages);
                    updateStats(response.data);
                }
            },
            error: function(xhr) {
                console.error('Error loading bookings:', xhr);
                $('#kba-bookings-body').html('<tr><td colspan="9" class="kba-loading">Error loading bookings. Please refresh.</td></tr>');
            }
        });
    }

    function renderBookings(bookings) {
        if (bookings.length === 0) {
            $('#kba-bookings-body').html('<tr><td colspan="9" class="kba-loading">No bookings found.</td></tr>');
            return;
        }

        let html = '';
        bookings.forEach(function(booking) {
            const date = new Date(booking.created_at);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const plannedDate = new Date(booking.planned_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            html += `
                <tr>
                    <td>#KBA-${booking.id}</td>
                    <td><strong>${escapeHtml(booking.full_name)}</strong></td>
                    <td><a href="mailto:${escapeHtml(booking.email)}">${escapeHtml(booking.email)}</a></td>
                    <td>${escapeHtml(booking.phone || '-')}</td>
                    <td>${plannedDate}</td>
                    <td>${escapeHtml(booking.group_size)}</td>
                    <td><span class="kba-status-badge kba-status-${booking.status}">${booking.status}</span></td>
                    <td>${formattedDate}</td>
                    <td>
                        <div class="kba-actions">
                            <button class="kba-view-btn" data-id="${booking.id}" title="View Details">
                                <span class="dashicons dashicons-visibility"></span>
                            </button>
                            <button class="kba-delete-btn" data-id="${booking.id}" title="Delete">
                                <span class="dashicons dashicons-trash"></span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        $('#kba-bookings-body').html(html);
    }

    function renderPagination(totalPages) {
        if (totalPages <= 1) {
            $('#kba-pagination').html('');
            return;
        }

        let html = '';
        
        // Previous button
        html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">« Previous</button>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                html += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                html += `<button disabled>...</button>`;
            }
        }

        // Next button
        html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">Next »</button>`;

        $('#kba-pagination').html(html);

        // Bind pagination clicks
        $('#kba-pagination button').on('click', function() {
            const page = $(this).data('page');
            if (page && !$(this).prop('disabled')) {
                currentPage = page;
                loadBookings();
            }
        });
    }

    function updateStats(bookings) {
        // Load all bookings to get accurate stats
        $.ajax({
            url: kbaApi.root + 'kaziranga-booking/v1/bookings',
            method: 'GET',
            data: {
                page: 1,
                per_page: 1
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
            },
            success: function(response) {
                if (response.success) {
                    $('#stat-total').text(response.total);
                    
                    // Get counts by status
                    const statuses = ['new', 'contacted', 'confirmed'];
                    statuses.forEach(function(status) {
                        $.ajax({
                            url: kbaApi.root + 'kaziranga-booking/v1/bookings',
                            method: 'GET',
                            data: {
                                page: 1,
                                per_page: 1,
                                status: status
                            },
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
                            },
                            success: function(statusResponse) {
                                if (statusResponse.success) {
                                    $(`#stat-${status}`).text(statusResponse.total);
                                }
                            }
                        });
                    });
                }
            }
        });
    }

    function viewBooking(bookingId) {
        $.ajax({
            url: kbaApi.root + 'kaziranga-booking/v1/bookings/' + bookingId,
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
            },
            success: function(response) {
                if (response.success) {
                    currentBookingId = bookingId;
                    renderBookingDetails(response.data);
                    $('#kba-modal').addClass('active');
                }
            },
            error: function(xhr) {
                alert('Error loading booking details.');
            }
        });
    }

    function renderBookingDetails(booking) {
        const plannedDate = new Date(booking.planned_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const createdDate = new Date(booking.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let html = `
            <div class="kba-detail-row">
                <div class="kba-detail-label">Booking ID</div>
                <div class="kba-detail-value">#KBA-${booking.id}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Full Name</div>
                <div class="kba-detail-value">${escapeHtml(booking.full_name)}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Email</div>
                <div class="kba-detail-value"><a href="mailto:${escapeHtml(booking.email)}">${escapeHtml(booking.email)}</a></div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Phone</div>
                <div class="kba-detail-value">${escapeHtml(booking.phone || 'Not provided')}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Planned Date</div>
                <div class="kba-detail-value">${plannedDate}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Group Size</div>
                <div class="kba-detail-value">${escapeHtml(booking.group_size)}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Safari Preferences</div>
                <div class="kba-detail-value">${escapeHtml(booking.safari_preferences || 'Not specified')}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Status</div>
                <div class="kba-detail-value"><span class="kba-status-badge kba-status-${booking.status}">${booking.status}</span></div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">IP Address</div>
                <div class="kba-detail-value">${escapeHtml(booking.ip_address || 'Unknown')}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">User Agent</div>
                <div class="kba-detail-value" style="font-size: 11px; word-break: break-all;">${escapeHtml(booking.user_agent || 'Unknown')}</div>
            </div>
            <div class="kba-detail-row">
                <div class="kba-detail-label">Submitted</div>
                <div class="kba-detail-value">${createdDate}</div>
            </div>
        `;

        $('#kba-modal-body').html(html);
        $('#kba-status-update').val(booking.status);
    }

    function closeModal() {
        $('#kba-modal').removeClass('active');
        currentBookingId = null;
    }

    function updateBookingStatus(bookingId, status) {
        if (!bookingId) {
            alert('No booking selected.');
            return;
        }

        $.ajax({
            url: kbaApi.root + 'kaziranga-booking/v1/bookings/' + bookingId + '/status',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ status: status }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
            },
            success: function(response) {
                if (response.success) {
                    alert('Status updated successfully!');
                    closeModal();
                    loadBookings();
                }
            },
            error: function(xhr) {
                alert('Error updating status.');
            }
        });
    }

    function deleteBooking(bookingId) {
        $.ajax({
            url: kbaApi.root + 'kaziranga-booking/v1/bookings/' + bookingId,
            method: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
            },
            success: function(response) {
                if (response.success) {
                    alert('Booking deleted successfully!');
                    closeModal();
                    loadBookings();
                }
            },
            error: function(xhr) {
                alert('Error deleting booking.');
            }
        });
    }

    function saveSettings() {
        const data = {
            admin_email: $('#admin_email').val(),
            email_from_name: $('#email_from_name').val(),
            email_subject_user: $('#email_subject_user').val(),
            email_subject_admin: $('#email_subject_admin').val(),
            enable_user_email: $('#enable_user_email').is(':checked') ? '1' : '0',
            enable_admin_email: $('#enable_admin_email').is(':checked') ? '1' : '0'
        };

        $.ajax({
            url: kbaApi.root + 'kaziranga-booking/v1/settings',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', kbaApi.nonce);
            },
            success: function(response) {
                if (response.success) {
                    alert('Settings saved successfully!');
                }
            },
            error: function(xhr) {
                alert('Error saving settings.');
            }
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})(jQuery);
