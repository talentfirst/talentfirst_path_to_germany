
const isValidEmail = (email) => {
  return email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};
export default isValidEmail;
