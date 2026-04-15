// lib/whatsappHelper.js

/**
 * WhatsApp Helper Utility
 * Reusable functions for WhatsApp messaging across the application
 */

// Default WhatsApp number (with +91)
const DEFAULT_PHONE_NUMBER = "+916003196559";

/**
 * Create WhatsApp URL with encoded message
 * @param {string} phoneNumber - WhatsApp number (with +91)
 * @param {string} message - Message content
 * @returns {string} - WhatsApp URL
 */
const createWhatsAppUrl = (phoneNumber, message) => {
  // Remove + sign for WhatsApp URL
  const formattedNumber = phoneNumber.replace('+', '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
};

/**
 * Open WhatsApp chat in new tab
 * @param {string} phoneNumber - WhatsApp number (with +91)
 * @param {string} message - Message content
 */
export const openWhatsApp = (phoneNumber, message) => {
  if (!phoneNumber) {
    console.error('Phone number is required');
    return;
  }
  const url = createWhatsAppUrl(phoneNumber, message);
  window.open(url, '_blank');
};

/**
 * Simple package inquiry message
 * @param {Object} pkg - Package details
 * @param {string} phoneNumber - Optional custom phone number
 */
export const sendPackageInquiry = (pkg, phoneNumber = DEFAULT_PHONE_NUMBER) => {
  if (!pkg) {
    console.error('Package data is required');
    return;
  }
  const message = `Hi! I'm interested in ${pkg.name} package (${pkg.duration}) - ${pkg.price}. Please share more details.`;
  openWhatsApp(phoneNumber, message);
};

/**
 * Simple bespoke journey inquiry
 * @param {string} phoneNumber - Optional custom phone number
 */
export const sendBespokeInquiry = (phoneNumber = DEFAULT_PHONE_NUMBER) => {
  const message = `Hi! I'm interested in a custom wildlife safari. Please share available options.`;
  openWhatsApp(phoneNumber, message);
};

/**
 * Simple contact message
 * @param {string} phoneNumber - Optional custom phone number
 */
export const sendContactMessage = (phoneNumber = DEFAULT_PHONE_NUMBER) => {
  const message = `Hi! I would like to know more about your safari packages.`;
  openWhatsApp(phoneNumber, message);
};

/**
 * Quick booking inquiry
 * @param {string} phoneNumber - Optional custom phone number
 */
export const sendBookingInquiry = (phoneNumber = DEFAULT_PHONE_NUMBER) => {
  const message = `Hi! I want to book a safari. Please let me know the availability.`;
  openWhatsApp(phoneNumber, message);
};

/**
 * Send custom message
 * @param {string} message - Custom message
 * @param {string} phoneNumber - Optional custom phone number
 */
export const sendCustomMessage = (message, phoneNumber = DEFAULT_PHONE_NUMBER) => {
  if (!message) {
    console.error('Message is required');
    return;
  }
  openWhatsApp(phoneNumber, message);
};


/**
 * Open phone dialer directly
 * @param {string} phoneNumber - Phone number (with +91)
 */
export const makePhoneCall = (phoneNumber = DEFAULT_PHONE_NUMBER) => {
  if (!phoneNumber) {
    console.error('Phone number is required');
    return;
  }

  // Open phone dialer
  window.location.href = `tel:${phoneNumber}`;
};

// Export all functions as a single object for convenience
export const WhatsAppHelper = {
  openWhatsApp,
  sendPackageInquiry,
  sendBespokeInquiry,
  sendContactMessage,
  sendBookingInquiry,
  sendCustomMessage,
  makePhoneCall,
  DEFAULT_PHONE_NUMBER
};