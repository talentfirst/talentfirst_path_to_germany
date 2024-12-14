
export const isPhoneValid = (phone) => {
  // Match phone numbers with:
  // 1. An optional '+' at the start.
  // 2. A country code (1-3 digits).
  // 3. A 10-digit number after the country code.
  const phoneRegex = /^\+?[1-9]\d{0,2}[-\s]?\d{10}$/;

  return phoneRegex.test(phone);
};
