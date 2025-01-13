export const validationRules = {
    username: {
        required: "Username is required",
        minLength: {
            value: 3,
            message: "Username must be at least 3 characters long",
        },
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
        },
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
        },
    },
};
