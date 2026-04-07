# Kaziranga Booking API - WordPress Plugin

A complete RESTful API plugin for managing safari booking form submissions with email notifications and admin dashboard.

## Features

- ✅ RESTful API for form submissions
- ✅ Admin dashboard with booking management
- ✅ View, delete, and update booking status
- ✅ Email notifications to both user and admin
- ✅ Custom admin email configuration
- ✅ Search and filter bookings
- ✅ Pagination support
- ✅ Responsive admin UI
- ✅ Security with nonce verification

## Installation

1. Upload the `kaziranga-booking-api` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Navigate to 'Safari Bookings' in the WordPress admin menu

## REST API Endpoints

### Submit Booking
```
POST /wp-json/kaziranga-booking/v1/submit
```

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "planned_date": "2026-05-15",
  "group_size": "Couple / 2 People",
  "safari_preferences": "Photography, Birding"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking inquiry submitted successfully!",
  "booking_id": 123
}
```

### Get All Bookings (Admin Only)
```
GET /wp-json/kaziranga-booking/v1/bookings?page=1&per_page=20&status=new&search=john
```

### Get Single Booking (Admin Only)
```
GET /wp-json/kaziranga-booking/v1/bookings/{id}
```

### Delete Booking (Admin Only)
```
DELETE /wp-json/kaziranga-booking/v1/bookings/{id}
```

### Update Booking Status (Admin Only)
```
PUT /wp-json/kaziranga-booking/v1/bookings/{id}/status
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

Status options: `new`, `contacted`, `confirmed`, `cancelled`

### Get Settings (Admin Only)
```
GET /wp-json/kaziranga-booking/v1/settings
```

### Update Settings (Admin Only)
```
POST /wp-json/kaziranga-booking/v1/settings
```

**Request Body:**
```json
{
  "admin_email": "admin@example.com",
  "email_from_name": "Kaziranga Adventure Hub",
  "email_subject_user": "Your Safari Booking Inquiry",
  "email_subject_admin": "New Safari Booking Inquiry Received",
  "enable_user_email": "1",
  "enable_admin_email": "1"
}
```

## Frontend Integration

See `integration-example.js` for complete frontend integration code.

## Database

The plugin creates a custom table: `wp_kaziranga_bookings`

**Columns:**
- `id` - Auto-increment primary key
- `full_name` - Customer name
- `email` - Customer email
- `phone` - Customer phone (optional)
- `planned_date` - Planned safari date
- `group_size` - Group size selection
- `safari_preferences` - Customer preferences (optional)
- `status` - Booking status (new/contacted/confirmed/cancelled)
- `ip_address` - User IP address
- `user_agent` - Browser user agent
- `created_at` - Submission timestamp
- `updated_at` - Last update timestamp

## Email Configuration

Navigate to **Safari Bookings > Settings** in WordPress admin to configure:

- **Admin Email**: Where booking notifications are sent
- **From Name**: Display name in email "From" field
- **User Email Subject**: Subject line for user confirmation emails
- **Admin Email Subject**: Subject line for admin notification emails
- **Enable/Disable User Emails**: Toggle user confirmation emails
- **Enable/Disable Admin Emails**: Toggle admin notification emails

## Security

- REST API endpoints require authentication for admin operations
- Public submission endpoint is open but validates all inputs
- Nonce verification for admin operations
- SQL injection prevention with prepared statements
- XSS prevention with output escaping

## Support

For support, contact: explore@kazirangaadventurehub.com

## License

GPL v2 or later
