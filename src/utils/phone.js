export const isValidPhoneNumber = (value) => {
    return /^\+?\d*$/.test(value);
}