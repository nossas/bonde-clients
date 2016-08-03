// Unrestrictive email regex. See http://is.gd/7n5YOk
// Update: Verifies that has domain.
const emailRegEx = /[^@]+@[^@]{2,}\.[^@]{2,}/
export const isValidEmail = email => emailRegEx.test(email)
