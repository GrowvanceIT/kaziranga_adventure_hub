<?php
/**
 * Plugin Name: Kaziranga Booking API
 * Plugin URI: https://kazirangaadventurehub.com
 * Description: RESTful API for managing safari booking form submissions with email notifications and admin dashboard.
 * Version: 1.0.0
 * Author: Nabin sarma
 * Author URI: https://bhaaratbyte.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: kaziranga-booking-api
 * Domain Path: /languages
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('KBA_PLUGIN_VERSION', '1.0.0');
define('KBA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('KBA_PLUGIN_URL', plugin_dir_url(__FILE__));
define('KBA_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class Kaziranga_Booking_API {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));

        // Initialize
        add_action('plugins_loaded', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }

    /**
     * Plugin activation - create database table
     */
    public function activate() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'kaziranga_bookings';

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) DEFAULT '',
            planned_date DATE NOT NULL,
            group_size VARCHAR(50) NOT NULL,
            safari_preferences TEXT DEFAULT '',
            status VARCHAR(20) DEFAULT 'new',
            ip_address VARCHAR(45) DEFAULT '',
            user_agent TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY email (email),
            KEY status (status),
            KEY planned_date (planned_date)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        // Add default options
        add_option('kba_admin_email', get_option('admin_email'));
        add_option('kba_email_from_name', 'Kaziranga Adventure Hub');
        add_option('kba_email_subject_user', 'Your Safari Booking Inquiry - Kaziranga Adventure Hub');
        add_option('kba_email_subject_admin', 'New Safari Booking Inquiry Received');
        add_option('kba_enable_user_email', '1');
        add_option('kba_enable_admin_email', '1');

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation
     */
    public function deactivate() {
        flush_rewrite_rules();
    }

    /**
     * Initialize plugin
     */
    public function init() {
        // Register REST API routes
        add_action('rest_api_init', array($this, 'register_rest_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        // Submit booking
        register_rest_route('kaziranga-booking/v1', '/submit', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_booking_submission'),
            'permission_callback' => '__return_true',
            'args' => array(
                'full_name' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_string($param) && !empty(trim($param));
                    }
                ),
                'email' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_email($param);
                    }
                ),
                'phone' => array(
                    'required' => false,
                    'validate_callback' => function($param) {
                        return empty($param) || is_string($param);
                    }
                ),
                'planned_date' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return !empty($param) && strtotime($param) !== false;
                    }
                ),
                'group_size' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_string($param) && !empty(trim($param));
                    }
                ),
                'safari_preferences' => array(
                    'required' => false,
                    'validate_callback' => function($param) {
                        return empty($param) || is_string($param);
                    }
                ),
            ),
        ));

        // Get all bookings (admin only)
        register_rest_route('kaziranga-booking/v1', '/bookings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_all_bookings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));

        // Get single booking (admin only)
        register_rest_route('kaziranga-booking/v1', '/bookings/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_single_booking'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
            'args' => array(
                'id' => array(
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        // Delete booking (admin only)
        register_rest_route('kaziranga-booking/v1', '/bookings/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_booking'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
            'args' => array(
                'id' => array(
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        // Update booking status (admin only)
        register_rest_route('kaziranga-booking/v1', '/bookings/(?P<id>\d+)/status', array(
            'methods' => 'PUT',
            'callback' => array($this, 'update_booking_status'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
            'args' => array(
                'id' => array(
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
                'status' => array(
                    'required' => true,
                    'validate_callback' => function($param) {
                        return in_array($param, array('new', 'contacted', 'confirmed', 'cancelled'));
                    }
                ),
            ),
        ));

        // Get settings (admin only)
        register_rest_route('kaziranga-booking/v1', '/settings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_settings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));

        // Update settings (admin only)
        register_rest_route('kaziranga-booking/v1', '/settings', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_settings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));
    }

    /**
     * Handle booking submission
     */
    public function handle_booking_submission($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kaziranga_bookings';

        $data = array(
            'full_name' => sanitize_text_field($request->get_param('full_name')),
            'email' => sanitize_email($request->get_param('email')),
            'phone' => sanitize_text_field($request->get_param('phone') ?: ''),
            'planned_date' => sanitize_text_field($request->get_param('planned_date')),
            'group_size' => sanitize_text_field($request->get_param('group_size')),
            'safari_preferences' => sanitize_textarea_field($request->get_param('safari_preferences') ?: ''),
            'status' => 'new',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        );

        $inserted = $wpdb->insert($table_name, $data);

        if ($inserted) {
            $booking_id = $wpdb->insert_id;

            // Send emails
            $this->send_user_email($data, $booking_id);
            $this->send_admin_email($data, $booking_id);

            return new WP_REST_Response(array(
                'success' => true,
                'message' => 'Booking inquiry submitted successfully!',
                'booking_id' => $booking_id,
            ), 201);
        }

        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Failed to submit booking. Please try again.',
        ), 500);
    }

    /**
     * Get all bookings
     */
    public function get_all_bookings($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kaziranga_bookings';

        $page = $request->get_param('page') ?: 1;
        $per_page = $request->get_param('per_page') ?: 20;
        $status = $request->get_param('status');
        $search = $request->get_param('search');
        $offset = ($page - 1) * $per_page;

        $where = array('1=1');
        $params = array();

        if ($status) {
            $where[] = 'status = %s';
            $params[] = $status;
        }

        if ($search) {
            $where[] = '(full_name LIKE %s OR email LIKE %s OR phone LIKE %s)';
            $search_param = '%' . $wpdb->esc_like($search) . '%';
            $params[] = $search_param;
            $params[] = $search_param;
            $params[] = $search_param;
        }

        $where_clause = implode(' AND ', $where);

        // Get total count
        $count_sql = "SELECT COUNT(*) FROM $table_name WHERE $where_clause";
        $total = $wpdb->get_var($wpdb->prepare($count_sql, $params));

        // Get bookings
        $sql = "SELECT * FROM $table_name WHERE $where_clause ORDER BY created_at DESC LIMIT %d OFFSET %d";
        $params[] = (int) $per_page;
        $params[] = (int) $offset;

        $bookings = $wpdb->get_results($wpdb->prepare($sql, $params), ARRAY_A);

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $bookings,
            'total' => (int) $total,
            'page' => (int) $page,
            'per_page' => (int) $per_page,
            'total_pages' => ceil($total / $per_page),
        ), 200);
    }

    /**
     * Get single booking
     */
    public function get_single_booking($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kaziranga_bookings';
        $id = $request->get_param('id');

        $booking = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE id = %d",
            $id
        ), ARRAY_A);

        if (!$booking) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'Booking not found.',
            ), 404);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $booking,
        ), 200);
    }

    /**
     * Delete booking
     */
    public function delete_booking($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kaziranga_bookings';
        $id = $request->get_param('id');

        $deleted = $wpdb->delete($table_name, array('id' => $id), array('%d'));

        if ($deleted) {
            return new WP_REST_Response(array(
                'success' => true,
                'message' => 'Booking deleted successfully.',
            ), 200);
        }

        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Booking not found or could not be deleted.',
        ), 404);
    }

    /**
     * Update booking status
     */
    public function update_booking_status($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kaziranga_bookings';
        $id = $request->get_param('id');
        $status = $request->get_param('status');

        $updated = $wpdb->update(
            $table_name,
            array('status' => $status),
            array('id' => $id),
            array('%s'),
            array('%d')
        );

        if ($updated !== false) {
            return new WP_REST_Response(array(
                'success' => true,
                'message' => 'Booking status updated successfully.',
            ), 200);
        }

        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Booking not found or could not be updated.',
        ), 404);
    }

    /**
     * Get settings
     */
    public function get_settings($request) {
        $settings = array(
            'admin_email' => get_option('kba_admin_email', get_option('admin_email')),
            'email_from_name' => get_option('kba_email_from_name', 'Kaziranga Adventure Hub'),
            'email_subject_user' => get_option('kba_email_subject_user', 'Your Safari Booking Inquiry - Kaziranga Adventure Hub'),
            'email_subject_admin' => get_option('kba_email_subject_admin', 'New Safari Booking Inquiry Received'),
            'enable_user_email' => get_option('kba_enable_user_email', '1'),
            'enable_admin_email' => get_option('kba_enable_admin_email', '1'),
        );

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $settings,
        ), 200);
    }

    /**
     * Update settings
     */
    public function update_settings($request) {
        $params = $request->get_json_params();

        if (isset($params['admin_email'])) {
            update_option('kba_admin_email', sanitize_email($params['admin_email']));
        }
        if (isset($params['email_from_name'])) {
            update_option('kba_email_from_name', sanitize_text_field($params['email_from_name']));
        }
        if (isset($params['email_subject_user'])) {
            update_option('kba_email_subject_user', sanitize_text_field($params['email_subject_user']));
        }
        if (isset($params['email_subject_admin'])) {
            update_option('kba_email_subject_admin', sanitize_text_field($params['email_subject_admin']));
        }
        if (isset($params['enable_user_email'])) {
            update_option('kba_enable_user_email', $params['enable_user_email'] ? '1' : '0');
        }
        if (isset($params['enable_admin_email'])) {
            update_option('kba_enable_admin_email', $params['enable_admin_email'] ? '1' : '0');
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Settings updated successfully.',
        ), 200);
    }

    /**
     * Send email to user
     */
    private function send_user_email($data, $booking_id) {
        if (get_option('kba_enable_user_email', '1') !== '1') {
            return;
        }

        $to = $data['email'];
        $from_name = get_option('kba_email_from_name', 'Kaziranga Adventure Hub');
        $from_email = get_option('admin_email');
        $subject = get_option('kba_email_subject_user', 'Your Safari Booking Inquiry - Kaziranga Adventure Hub');

        $planned_date = date('F j, Y', strtotime($data['planned_date']));

        $message = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #16a34a; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
                .detail-row:last-child { border-bottom: none; }
                .label { font-weight: bold; color: #16a34a; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Thank You for Your Inquiry!</h1>
                    <p>Kaziranga Adventure Hub</p>
                </div>
                <div class='content'>
                    <p>Dear {$data['full_name']},</p>
                    <p>Thank you for your interest in exploring Kaziranga National Park with us! We have received your booking inquiry and our team will review it shortly.</p>
                    
                    <div class='details'>
                        <h3 style='margin-top: 0;'>Your Inquiry Details:</h3>
                        <div class='detail-row'>
                            <span class='label'>Booking Reference:</span> #KBA-{$booking_id}
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Planned Date:</span> {$planned_date}
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Group Size:</span> {$data['group_size']}
                        </div>
                        " . (!empty($data['safari_preferences']) ? "<div class='detail-row'>
                            <span class='label'>Preferences:</span> {$data['safari_preferences']}
                        </div>" : "") . "
                    </div>
                    
                    <p>Our team will contact you within 24 hours to confirm availability and provide further details.</p>
                    
                    <p>Best regards,<br>
                    <strong>Kaziranga Adventure Hub Team</strong><br>
                    📧 explore@kazirangaadventurehub.com<br>
                    📞 +91 98765 43210</p>
                </div>
                <div class='footer'>
                    <p>This is an automated message. Please do not reply to this email.</p>
                    <p>&copy; " . date('Y') . " Kaziranga Adventure Hub. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . $from_name . ' <' . $from_email . '>',
            'Reply-To: ' . $from_email,
        );

        wp_mail($to, $subject, $message, $headers);
    }

    /**
     * Send email to admin
     */
    private function send_admin_email($data, $booking_id) {
        if (get_option('kba_enable_admin_email', '1') !== '1') {
            return;
        }

        $to = get_option('kba_admin_email', get_option('admin_email'));
        $from_name = get_option('kba_email_from_name', 'Kaziranga Adventure Hub');
        $subject = get_option('kba_email_subject_admin', 'New Safari Booking Inquiry Received');

        $planned_date = date('F j, Y', strtotime($data['planned_date']));

        $message = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #16a34a; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
                .detail-row:last-child { border-bottom: none; }
                .label { font-weight: bold; color: #16a34a; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .btn { display: inline-block; padding: 12px 24px; background: #16a34a; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>New Booking Inquiry Received</h1>
                    <p>Kaziranga Adventure Hub</p>
                </div>
                <div class='content'>
                    <p>A new safari booking inquiry has been submitted:</p>
                    
                    <div class='details'>
                        <div class='detail-row'>
                            <span class='label'>Booking ID:</span> #KBA-{$booking_id}
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Full Name:</span> {$data['full_name']}
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Email:</span> <a href='mailto:{$data['email']}'>{$data['email']}</a>
                        </div>
                        " . (!empty($data['phone']) ? "<div class='detail-row'>
                            <span class='label'>Phone:</span> {$data['phone']}
                        </div>" : "") . "
                        <div class='detail-row'>
                            <span class='label'>Planned Date:</span> {$planned_date}
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Group Size:</span> {$data['group_size']}
                        </div>
                        " . (!empty($data['safari_preferences']) ? "<div class='detail-row'>
                            <span class='label'>Preferences:</span> {$data['safari_preferences']}
                        </div>" : "") . "
                        <div class='detail-row'>
                            <span class='label'>IP Address:</span> {$data['ip_address']}
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Submitted:</span> " . current_time('mysql') . "
                        </div>
                    </div>
                    
                    <a href='" . admin_url('admin.php?page=kaziranga-bookings') . "' class='btn'>View in Admin Panel</a>
                </div>
                <div class='footer'>
                    <p>&copy; " . date('Y') . " Kaziranga Adventure Hub. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . $from_name . ' <' . get_option('admin_email') . '>',
            'Reply-To: ' . $data['email'],
        );

        wp_mail($to, $subject, $message, $headers);
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Kaziranga Bookings',
            'Safari Bookings',
            'manage_options',
            'kaziranga-bookings',
            array($this, 'render_admin_page'),
            'dashicons-calendar-alt',
            30
        );

        add_submenu_page(
            'kaziranga-bookings',
            'Settings',
            'Settings',
            'manage_options',
            'kaziranga-bookings-settings',
            array($this, 'render_settings_page')
        );
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'kaziranga-bookings') === false) {
            return;
        }

        wp_enqueue_style('kba-admin-css', KBA_PLUGIN_URL . 'assets/css/admin.css', array(), KBA_PLUGIN_VERSION);
        wp_enqueue_script('kba-admin-js', KBA_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), KBA_PLUGIN_VERSION, true);
        wp_localize_script('kba-admin-js', 'kbaApi', array(
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
        ));
    }

    /**
     * Render admin page
     */
    public function render_admin_page() {
        ?>
        <div class="wrap kba-admin-wrap">
            <div class="kba-header">
                <h1 class="wp-heading-inline">
                    <span class="dashicons dashicons-calendar-alt"></span>
                    Safari Booking Inquiries
                </h1>
                <a href="<?php echo admin_url('admin.php?page=kaziranga-bookings-settings'); ?>" class="page-title-action">
                    <span class="dashicons dashicons-admin-generic"></span> Settings
                </a>
            </div>

            <div class="kba-stats">
                <div class="kba-stat-card">
                    <div class="kba-stat-icon kba-stat-new">
                        <span class="dashicons dashicons-email"></span>
                    </div>
                    <div class="kba-stat-content">
                        <span class="kba-stat-number" id="stat-new">0</span>
                        <span class="kba-stat-label">New Inquiries</span>
                    </div>
                </div>
                <div class="kba-stat-card">
                    <div class="kba-stat-icon kba-stat-contacted">
                        <span class="dashicons dashicons-visibility"></span>
                    </div>
                    <div class="kba-stat-content">
                        <span class="kba-stat-number" id="stat-contacted">0</span>
                        <span class="kba-stat-label">Contacted</span>
                    </div>
                </div>
                <div class="kba-stat-card">
                    <div class="kba-stat-icon kba-stat-confirmed">
                        <span class="dashicons dashicons-yes"></span>
                    </div>
                    <div class="kba-stat-content">
                        <span class="kba-stat-number" id="stat-confirmed">0</span>
                        <span class="kba-stat-label">Confirmed</span>
                    </div>
                </div>
                <div class="kba-stat-card">
                    <div class="kba-stat-icon kba-stat-total">
                        <span class="dashicons dashicons-groups"></span>
                    </div>
                    <div class="kba-stat-content">
                        <span class="kba-stat-number" id="stat-total">0</span>
                        <span class="kba-stat-label">Total</span>
                    </div>
                </div>
            </div>

            <div class="kba-filters">
                <input type="text" id="kba-search" placeholder="Search by name, email, or phone..." class="kba-search-input">
                <select id="kba-status-filter" class="kba-select">
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button id="kba-refresh" class="button button-primary">
                    <span class="dashicons dashicons-update"></span> Refresh
                </button>
            </div>

            <div class="kba-table-container">
                <table class="wp-list-table widefat fixed striped" id="kba-bookings-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Group Size</th>
                            <th>Status</th>
                            <th>Submitted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="kba-bookings-body">
                        <tr>
                            <td colspan="9" class="kba-loading">
                                <span class="spinner is-active"></span> Loading bookings...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="kba-pagination" id="kba-pagination"></div>
        </div>

        <!-- Booking Details Modal -->
        <div id="kba-modal" class="kba-modal">
            <div class="kba-modal-content">
                <div class="kba-modal-header">
                    <h2>Booking Details</h2>
                    <button class="kba-modal-close">&times;</button>
                </div>
                <div class="kba-modal-body" id="kba-modal-body">
                    <!-- Content loaded dynamically -->
                </div>
                <div class="kba-modal-footer">
                    <select id="kba-status-update" class="kba-select">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button id="kba-update-status" class="button button-primary">Update Status</button>
                    <button id="kba-delete-booking" class="button button-danger">
                        <span class="dashicons dashicons-trash"></span> Delete
                    </button>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * Render settings page
     */
    public function render_settings_page() {
        ?>
        <div class="wrap kba-admin-wrap">
            <h1>
                <span class="dashicons dashicons-admin-generic"></span>
                Booking API Settings
            </h1>

            <div class="kba-settings-container">
                <div class="kba-api-info">
                    <h2>REST API Endpoint</h2>
                    <div class="kba-api-endpoint">
                        <code><?php echo esc_url(rest_url('kaziranga-booking/v1/submit')); ?></code>
                        <button class="button" onclick="navigator.clipboard.writeText('<?php echo esc_url(rest_url('kaziranga-booking/v1/submit')); ?>')">
                            <span class="dashicons dashicons-clipboard"></span> Copy
                        </button>
                    </div>
                    <p class="description">Use this endpoint to submit booking forms from your frontend application.</p>
                </div>

                <form id="kba-settings-form" class="kba-settings-form">
                    <h2>Email Configuration</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th><label for="admin_email">Admin Email</label></th>
                            <td>
                                <input type="email" id="admin_email" name="admin_email" class="regular-text" value="<?php echo esc_attr(get_option('kba_admin_email', get_option('admin_email'))); ?>" required>
                                <p class="description">Email address where booking notifications will be sent.</p>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="email_from_name">From Name</label></th>
                            <td>
                                <input type="text" id="email_from_name" name="email_from_name" class="regular-text" value="<?php echo esc_attr(get_option('kba_email_from_name', 'Kaziranga Adventure Hub')); ?>">
                                <p class="description">Name displayed in the "From" field of emails.</p>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="email_subject_user">User Email Subject</label></th>
                            <td>
                                <input type="text" id="email_subject_user" name="email_subject_user" class="regular-text" value="<?php echo esc_attr(get_option('kba_email_subject_user', 'Your Safari Booking Inquiry - Kaziranga Adventure Hub')); ?>">
                                <p class="description">Subject line for confirmation emails sent to users.</p>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="email_subject_admin">Admin Email Subject</label></th>
                            <td>
                                <input type="text" id="email_subject_admin" name="email_subject_admin" class="regular-text" value="<?php echo esc_attr(get_option('kba_email_subject_admin', 'New Safari Booking Inquiry Received')); ?>">
                                <p class="description">Subject line for notification emails sent to admin.</p>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="enable_user_email">Send User Email</label></th>
                            <td>
                                <label>
                                    <input type="checkbox" id="enable_user_email" name="enable_user_email" value="1" <?php checked(get_option('kba_enable_user_email', '1'), '1'); ?>>
                                    Enable confirmation emails to users
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="enable_admin_email">Send Admin Email</label></th>
                            <td>
                                <label>
                                    <input type="checkbox" id="enable_admin_email" name="enable_admin_email" value="1" <?php checked(get_option('kba_enable_admin_email', '1'), '1'); ?>>
                                    Enable notification emails to admin
                                </label>
                            </td>
                        </tr>
                    </table>

                    <p class="submit">
                        <button type="submit" class="button button-primary button-large">Save Settings</button>
                    </p>
                </form>
            </div>
        </div>
        <?php
    }
}

// Initialize the plugin
Kaziranga_Booking_API::get_instance();
