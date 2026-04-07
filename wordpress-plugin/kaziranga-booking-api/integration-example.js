/**
 * Kaziranga Booking API - Frontend Integration Example
 * 
 * This file shows how to integrate the WordPress REST API
 * with the PremiumBookingSystem component in your Next.js app.
 * 
 * Usage:
 * 1. Update the API_URL with your WordPress site URL
 * 2. Copy the handleSubmit function into your PremiumBookingSystem.jsx
 * 3. Add name attributes to your form inputs
 */

// Configuration
const API_URL = 'https://your-wordpress-site.com/wp-json/kaziranga-booking/v1';

/**
 * Submit booking to WordPress API
 * @param {Object} formData - Form data object
 * @returns {Promise<Object>} - API response
 */
export async function submitBooking(formData) {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || '',
        planned_date: formData.plannedDate,
        group_size: formData.groupSize,
        safari_preferences: formData.safariPreferences || '',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit booking');
    }

    return data;
  } catch (error) {
    console.error('Booking submission error:', error);
    throw error;
  }
}

/**
 * Example usage in PremiumBookingSystem.jsx
 * 
 * Replace your current handleSubmit function with this:
 * 
 * const [formData, setFormData] = useState({
 *   fullName: '',
 *   email: '',
 *   phone: '',
 *   plannedDate: '',
 *   groupSize: 'Couple / 2 People',
 *   safariPreferences: '',
 * });
 * const [isSubmitting, setIsSubmitting] = useState(false);
 * const [error, setError] = useState('');
 * 
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   setIsSubmitting(true);
 *   setError('');
 * 
 *   try {
 *     const response = await submitBooking(formData);
 *     if (response.success) {
 *       setIsSubmitted(true);
 *       // Reset form
 *       setFormData({
 *         fullName: '',
 *         email: '',
 *         phone: '',
 *         plannedDate: '',
 *         groupSize: 'Couple / 2 People',
 *         safariPreferences: '',
 *       });
 *       setTimeout(() => {
 *         setIsSubmitted(false);
 *         setIsOpen(false);
 *       }, 3000);
 *     }
 *   } catch (err) {
 *     setError(err.message || 'Failed to submit booking. Please try again.');
 *   } finally {
 *     setIsSubmitting(false);
 *   }
 * };
 */
