export const validateEmail = (email: string): string | true => {
    if (!email) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return 'Please enter a valid email address (e.g., user@example.com)';
    }
    return true;
};

export const validatePassword = (password: string): string | true => {
    if (!password) return 'Password is required';
    if (password.length <= 3) return 'Password must be at least 6 characters long';
    return true;
};
